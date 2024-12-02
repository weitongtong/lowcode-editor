# Lowcode Editor

## 布局

|  header 头部区  |      |      |                        |                |      |      |
| :-------------: | ---- | ---- | ---------------------- | -------------- | ---- | ---- |
| Material 物料区 |      |      | EditArea 画布区        | Setting 属性区 |      |      |
|      物料       | 大纲 | 源码 | 通过拖拽编辑组件树数据 | 属性           | 样式 | 事件 |

## 目录

- editor
  - components
    - Header 头部区
    - EditArea 画布区
      - HoverMask：hover 蒙层（绝对定位）展示高亮效果和组件名称展示
      - SelectMask：select 蒙层（绝对定位）
    - MaterialWrapper 左侧物料区 Tab（物料、大纲、源码）
    - Material 物料：展示 component-config 中的物料
    - Outline 大纲：展示 components 树
    - Source 源码：展示 components 树 json
    - Setting 右侧属性区 Tab （属性、样式、事件）（配置完这些信息都会出现在 componens 数据里）
      - ComponentAttr：从 component-config 中获取当前组件的属性配置 setter
      - ComponentStyle：从 component-config 中获取当前组件的样式配置 styleSetter
      - ComponentEvent: 从 component-config 中获取当前组件的事件配置 event，可以配置哪些事件，针对各个事件都可以配置事件处理动作 callback
      - ActionModal: 新增、编辑事件动作配置弹窗
      - actions
        - GoToLink: 访问链接
        - CustomJS: 自定义 JS
        - ShowMessage: message 提示
        - ComponentMethod: 调用组件方法
    - Priview 预览： 递归渲染 components, 包含属性、样式、和事件回调（在回调里处理各种 action）
  - hooks
  - materials 物料
    - Page
    - Button
      - dev 用于画布区展示，只负责展示、可拖拽，不需要做任何事件交互的逻辑
      - prod 用于预览展示
    - Container
    - Modal
    - Table
    - TableColumn
    - Form
    - FormItem
  - stores
    - component-config：核心针对各个组件的配置数据
    - components：核心组件树数据
  - index.tsx
