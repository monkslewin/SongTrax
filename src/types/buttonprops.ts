export type ButtonProps = {
    label?: string;
    isSelected: boolean;
    onClick: () => void;
    
}

export type ToggleRowProps = {
    label: string;
    buttonStates: boolean[];
    handleRowChange: (label: string, newStates: boolean[]) => void;
    onButtonClick: (label: string) => void;
  };

