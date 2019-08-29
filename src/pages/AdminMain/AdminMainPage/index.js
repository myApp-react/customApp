import React, {PureComponent, Fragment} from 'react';
import { connect } from 'dva'
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker } from 'react-color'

@connect(({AdminMainPage}) => ({AdminMainPage}))
class PreviewPages extends PureComponent{
  state = {
    data: [],
    color: '#fff'
  }
  componentDidMount(){
    const { dispatch } = this.props

    dispatch({
      type: 'AdminMainPage/getBiconfig'
    })
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    console.log("this.props", this.props)
    const { AdminMainPage } = this.props
    const { color } = this.state
    console.log("color", color)
    return (
      <div>
        <SketchPicker
          color={color}
          presetColors={["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"]}
          onChangeComplete={ this.handleChangeComplete }
        />

        <AlphaPicker />
        <BlockPicker />
        <ChromePicker />
        <CirclePicker />
        <CompactPicker />
        <GithubPicker />
        <HuePicker />
        <MaterialPicker />
        <PhotoshopPicker />
          <SliderPicker />, <SwatchesPicker />, <TwitterPicker />

      </div>
    )
  }

}

export default PreviewPages
