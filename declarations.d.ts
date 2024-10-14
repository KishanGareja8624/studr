declare module '*.png' {
    const value: any;
    export default value;
  }

  declare module 'react-progressbar' {
    import { Component } from 'react';

    export interface ProgressBarProps {
        completed?: number;
        color?: string;
        height?: number;
        // Add more props as needed based on the documentation
    }

    export default class ProgressBar extends Component<ProgressBarProps> {}
}
