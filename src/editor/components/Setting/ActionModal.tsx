import { Modal, Segmented } from "antd";
import { useEffect, useState } from "react";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";
import { CustomJS, CustomJSConfig } from "./actions/CustomJS";
import { ComponentMethod, ComponentMethodConfig } from "./actions/ComponentMethod";

export type ActionConfig = GoToLinkConfig | ShowMessageConfig | ComponentMethodConfig | CustomJSConfig;

interface ActionModalProps {
  visible: boolean;
  action?: ActionConfig;
  isEdit: boolean;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}

export function ActionModal(props: ActionModalProps) {
  console.log('ActionModel render------');
  const { visible, action, isEdit, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>(action?.type || "访问链接");
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  const map = {
    goToLink: "访问链接",
    showMessage: "消息提示",
    componentMethod: "组件方法",
    customJS: "自定义 JS",
  };
  useEffect(() => {
    if (action?.type) {
      setKey(map[action.type])
    }
  }, [action])

  // function handleAfterClose() {
  //   setKey(map.goToLink);
  // }

  useEffect(() => {
    if (visible && (!isEdit)) {
      setKey(map.goToLink);
      setCurConfig(undefined)
    }
  }, [visible])

  return (
    <Modal
      title={`${isEdit ? '编辑' : '新增'}事件动作配置`}
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
      // afterClose={handleAfterClose}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={["访问链接", "消息提示", "组件方法", "自定义 JS"]}
        />
        <div>1111</div>
        <div>{JSON.stringify(action)}</div>
        {key === "访问链接" && (
          <GoToLink
            value={curConfig?.type === 'goToLink' ? curConfig.url : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            value={curConfig?.type === 'showMessage' ? curConfig.config : undefined}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {
          key === '组件方法' && (
            <ComponentMethod
              value={curConfig?.type === 'componentMethod' ? curConfig.config: undefined}
              onChange={(config) => {
                setCurConfig(config);
              }}
             />
          )
        }
        {key === "自定义 JS" && (
          <CustomJS
            value={curConfig?.type === 'customJS' ? curConfig.code : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
