import { Radio } from "antd";
import type { RadioGroupProps } from "antd";
import { observer } from "mobx-react-lite";

export interface RadioSwitchOption {
  label: string;
  value: string | number;
}

interface RadioSwitchProps extends Omit<RadioGroupProps, "options"> {
  options?: RadioSwitchOption[];
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  buttonStyle?: "outline" | "solid";
}

/**
 * 通用单选按钮组组件
 * 可以在 Form.Item 中使用
 *
 * @example
 * // 使用预定义的选项
 * <Form.Item name="status">
 *   <RadioSwitch
 *     options={[
 *       { label: "启动", value: "start" },
 *       { label: "停止", value: "stop" }
 *     ]}
 *   />
 * </Form.Item>
 *
 * // 或者使用简单配置
 * <RadioSwitch
 *   value={value}
 *   onChange={onChange}
 *   options={[
 *     { label: "是", value: true },
 *     { label: "否", value: false }
 *   ]}
 * />
 */
const RadioSwitch = observer(
  ({
    options = [],
    value,
    onChange,
    disabled = false,
    size = "middle",
    buttonStyle = "solid",
    ...rest
  }: RadioSwitchProps) => {
    return (
      <Radio.Group
        value={value}
        onChange={onChange}
        disabled={disabled}
        size={size}
        buttonStyle={buttonStyle}
        {...rest}
        optionType="default"
      >
        {options.map((option) => (
          <Radio.Button key={option.value} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
);

export default RadioSwitch;
