<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose">
    <div
      class="el-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && selected.length">
        <c-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions>
          <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
        </c-tag>
        <c-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions>
          <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
        </c-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <c-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="el-select__tags-text">{{ item.currentLabel }}</span>
        </c-tag>
      </transition-group>
      <input
        type="text"
        class="el-select__input"
        :class="[selectSize ? `is-${ selectSize }` : '']"
        :disabled="selectDisabled"
        :autocomplete="autoComplete || autocomplete"
        @focus="handleFocus"
        @blur="softFocus = false"
        @click.stop
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
        ref="input">
    </div>
    <c-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </c-input>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <c-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="options.length > 0 && !loading">
          <c-option
            :value="query"
            created
            v-if="showNewOption">
          </c-option>
           <c-option
              v-for="( item,$index ) in data"
              :key="$index + '_' + item.value"
              :label="item.label"
              :value="item.value"
            ></c-option>
        </c-scrollbar>
        <p
          class="el-select-dropdown__empty"
          v-if="emptyText &&
            (!allowCreate || loading || (allowCreate && options.length === 0 ))">
          {{ emptyText }}
        </p>
      </el-select-menu>
    </transition>
  </div>
</template>

<script>
import Select from '@cci/cp-select'
import request from '@/utils/request'
export default {
  mixins: [Select],
  data() {
    return {
      data: []
    }
  },
  props: {
    valueToLabelParams: {
      type: Object,
      default() {
        return {}
      }
    },
    valueType: {
      type: String,
      default: 'Number' // Number or String
    }
  },
  methods: {
    formData(data) {
      const vType = this.valueType
      return data.map(item => {
        return {
          // value: /\d+/.test(item.codeValue) ? parseInt(item.codeValue) : item.codeValue,
          value: vType === "Number" && /^\d+$/.test(item.codeValue) ? parseInt(item.codeValue) : item.codeValue + '',
          label: item.codeName,
          ...item
        }
      })
    },
    getLabelById(value) {
      return new Promise((resolve) => {
        const { url, idKey } = this.valueToLabelParams
        if (!url || !value) return resolve(value)
        const params = {}
        params[idKey] = value
        request({
          url,
          methods: 'get',
          params
        }).then(({ data }) => {
          resolve(data)
        })
      })
    }
  }
}
</script>
