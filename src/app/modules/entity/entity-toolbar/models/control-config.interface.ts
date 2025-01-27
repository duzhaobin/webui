import { Option } from 'app/interfaces/option.interface';

export interface ControlConfig {
  label?: string;
  value?: Option[];
  options?: ToolbarOption[];
  placeholder?: string;
  customTriggerValue?: string;
  required?: boolean;
  zeroStateMessage?: string;
  multiple?: boolean;
}

/**
 * Shared by multiple controls (menu, select, etc).
 */
export interface ToolbarOption {
  label: string;
  value: string | number;

  disabled?: boolean;
  disable?: boolean;
  icon?: string;
  labelIcon?: string;
  labelIconType?: string;
  hiddenFromDisplay?: boolean;
}
