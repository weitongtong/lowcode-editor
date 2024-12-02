import React, { useRef } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponetsStore } from "../../stores/components";
import { message } from "antd";
import { ActionConfig } from "../Setting/ActionModal";

export function Preview() {
  const { components } = useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  const componentRefs = useRef<Record<string, any>>({})

  function handleEvent(component: Component) {
    const props: Record<string, any> = {};

    // 从组件配置中获取当前组件的事件配置，遍历判断是否有实际配置，如果有，则设置事件回调函数
    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];
      if (eventConfig) {
        eventConfig?.actions?.forEach((action: ActionConfig) => {
          const { type } = action;
  
          props[event.name] = (...args: any[]) => {
            if (type === "goToLink" && action.url) {
              window.location.href = action.url;
            } else if (type === "showMessage" && action.config) {
              if (action.config.type === "success") {
                message.success(action.config.text);
              } else if (action.config.type === "error") {
                message.error(action.config.text);
              }
            } else if(type === 'customJS') {
              const func = new Function('context', 'args', action.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content)
                }
              }, args)
            } else if (type === 'componentMethod') {
              const componentRef = componentRefs.current[action.config.componentId];
              if (componentRef) {
                componentRef[action.config.method]?.(...args)
              }
            }
          };
        });
      }
    });
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
          ref: (ref: Record<string, any>) => { componentRefs.current[component.id] = ref},
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
