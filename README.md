# Transitioning Result Icon for Vue.js

A scalable result icon (SVG) that transitions the state change, that is the SVG shape change is transitioned as well as the color. Demonstration can be found [here](https://transitioning-result-icon.dexmo-hq.com).

## Install
```sh
npm i --save @dexmo/vue-transitioning-result-icon
```
```sh
yarn add @dexmo/vue-transitioning-result-icon
```

## Usage 
```javascript
import TransitioningResultIcon from '@dexmo/vue-transitioning-result-icon';
```
```html
<transitioning-result-icon :error="errorFlag"/>
```

## Props
| Name         | Type                    | Description                                |
|--------------|-------------------------|--------------------------------------------|
| error        | Boolean                 | Whether to display error or result icon    |
| duration     | Number *(default: 500)*     | Duration of the transition in milliseconds |
| successColor | String *(default: 'green')* | CSS Color string for the success state     |
| errorColor   | String *(default: 'red')*   | CSS Color string for the error state       |
