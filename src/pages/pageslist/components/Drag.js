import React, { PureComponent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from './Drag.less';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Spin, Modal } from 'antd';
import { TabBar, Carousel, Grid, MallList, TitleBar, Brand, Activity } from "@/components";
import { pathMatchRegexp } from '@/utils';

const { confirm } = Modal;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#fff",
  outline: isDragging ? "2px dashed #0E73FF" : "none",
  // boxShadow: isDragging ? "0 0 6px rgba(14, 115, 255, .6)" : "none",
  // outline: isDragging ? "2px dashed #0E73FF" : "2px dashed #fff",
  // outlineOffset: 0,

  // boxShadow: '0 0 6px rgba(63,70,82,.5)',
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  margin: '0 auto 40px',
  padding: grid,
  width: '391px',
  background: isDraggingOver ? "#F8D0D1" : "#F0F2F5",
  boxShadow: 'inset 0 0 12px rgba(63,70,82,.5)',
});

class Drag extends PureComponent {

  state = {
    initData: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.initData !== prevState.initData){
      return {
        initData: nextProps.initData
      }
    }
    return null
  }


  onDragEnd = (result) => {
    const { handleRefresh, dispatch } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const initData = reorder(
      this.state.initData,
      result.source.index,
      result.destination.index
    );

    dispatch({ type: 'pagesinfo/updateInit', payload: { initData }});
    //同步后端 （后期优化点）
    dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson: JSON.stringify(initData)}})
  }

  componentWillUnmount(){
    //销毁时清空
    this.props.dispatch({ type: 'pagesinfo/updateInit', payload: { initData: []}})
  }

  removeSwiperHandle = (e) => {
    // removeCarousel
    const { initData, dispatch, handleRefresh } = this.props;
    // const { query, pathname } = location;
    // const match = pathMatchRegexp('/pageslist/details/:id', pathname)
    const imageConfigId = e.target.getAttribute("data-id");
    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== imageConfigId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeCarousel', payload: { imageConfigId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });

  }

  //删除功能模块
  removeGridHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const modelId = e.target.getAttribute("data-id");
    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== modelId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeGrid', payload: { modelId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });




  }

  removeBrandHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const modelId = e.target.getAttribute("data-id");
    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== modelId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeBrand', payload: { modelId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });

  }

  removeTitleHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const titleConfigId = e.target.getAttribute("data-id");
    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== titleConfigId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeTitle', payload: { titleConfigId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });

  }

  removeActivityHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const activityConfigId = e.target.getAttribute("data-id");
    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== activityConfigId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeActivity', payload: { activityConfigId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });
  }

  removeMallHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const integralConfigId = e.target.getAttribute("data-id");

    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== integralConfigId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeMall', payload: { integralConfigId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });


  }

  removeTabBarHandle = (e) => {
    const { initData, dispatch, handleRefresh } = this.props;
    const imageConfigId = e.target.getAttribute("data-id");

    confirm({
      title: '确认删除该模块吗？',
      onOk() {
        const filterData = initData.filter(_ => _.Id !== imageConfigId)
        const configJson = JSON.stringify(filterData)
        dispatch({ type: 'pagesinfo/removeNavbar', payload: { imageConfigId }}).then(_ => {
          if(_){
            dispatch({ type: 'pagesinfo/updateInit', payload: { initData: filterData }});
            dispatch({ type: 'pagesinfo/sortByHandle', payload: { configJson }})
          }
        })
      },
    });
  }




  componentDidCatch(error, info) {
    console.warn(error, info)
  }

  render() {
    const { _swiperHandle, _tabbarHandle, _gridHandle, _titleHandle, _mallHandle, _brandHandle, loading, _activityHandle } = this.props;
    return (
      <Spin tip="Loading..." spinning={loading.effects['pagesinfo/query']}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {
                  this.state.initData.map((_, index) => {
                    const mainType = _.type;
                    let htmlStr = [];
                    if(mainType === 1){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.swiper} >
                              <Carousel IsFloat={_.IsFloat} RollingTime={_.RollingTime || 3000} Images={_.Images}/>
                              {/*<div className={style['swiper-main']}>*/}
                                {/*<img className={style['swiper-main-img']} src={swipeImg} alt=""/>*/}
                              {/*</div>*/}
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    data-id={_.Id}
                                    style={{marginRight: 12}}
                                    onClick={_swiperHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeSwiperHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 2){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.gird}>
                              <Grid
                                BackgroundColor={_.BackgroundColor}
                                StyleType={_.StyleType}
                                RowShowType={_.RowShowType}
                                FontSize={_.FontSize}
                                Buttons={_.Buttons}
                                FontColor={_.FontColor}
                              />
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    style={{marginRight: 12}}
                                    data-id={_.Id}
                                    onClick={_gridHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeGridHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 3){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.brand}>
                              <Brand
                                IsIcon={_.IsIcon}
                                LogoColor={_.LogoColor}
                                BackColor={_.BackColor}
                                ShopPro={_.ShopPro}
                                BranddetailUrl={_.BranddetailUrl}
                              />
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    style={{marginRight: 12}}
                                    data-id={_.Id}
                                    onClick={_brandHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeBrandHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 4){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.title}>
                              <TitleBar
                                Fromabove={_.Fromabove}
                                Istemplate={_.Istemplate}
                                BackColor={_.BackColor}
                                BackImage={_.BackImage}
                                LeftImage={_.LeftImage}
                                HeadLine={_.HeadLine}
                                HeadLineSize={_.HeadLineSize}
                                HeadLineColor={_.HeadLineColor}
                                RightWord={_.RightWord}
                                RightWordSize={_.RightWordSize}
                                RightWordColor={_.RightWordColor}
                                RightImage={_.RightImage}
                                OpenUrl={_.OpenUrl}
                                CustomLink={_.CustomLink}
                                FuncLink={_.FuncLink}
                              />
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <div className={style['cover-mask-item']}>
                                    <Button
                                      type="primary"
                                      shape="round"
                                      icon="form"
                                      size='small'
                                      style={{marginRight: 12}}
                                      data-id={_.Id}
                                      onClick={_titleHandle}
                                    >编辑</Button>
                                    <Button
                                      type="danger"
                                      shape="round"
                                      icon="delete"
                                      size='small'
                                      data-id={_.Id}
                                      onClick={this.removeTitleHandle}
                                    >删除</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 5){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.activity}>
                              <Activity Image={_.Image} Name={_.Name} activityId={_.activityId} activityUrl={_.activityUrl}/>
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    style={{marginRight: 12}}
                                    data-id={_.Id}
                                    onClick={_activityHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeActivityHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 6){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.mall}>
                              <MallList
                                AccordingNum={_.AccordingNum}
                                NameSize={_.NameSize}
                                NameColor={_.NameColor}
                                BtnNameSize={_.BtnNameSize}
                                BtnNameColor={_.BtnNameColor}
                                BtnBackColor={_.BtnBackColor}
                                PointsSize={_.PointsSize}
                                PointsColor={_.PointsColor}
                                Style={_.Style}
                              />
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    style={{marginRight: 12}}
                                    data-id={_.Id}
                                    onClick={_mallHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeMallHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    if(mainType === 7 ){
                      htmlStr.push(<Draggable key={_.Id} draggableId={_.Id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className={style.navbar}>
                              <TabBar
                                BaseColor={_.BaseColor}
                                FontSize={_.FontSize}
                                FontColor={_.FontColor}
                                SelectColor={_.SelectColor}
                                Images={_.Images}
                              />
                              <div className={style.cover}>
                                <div className={style['cover-mask']} >
                                  <Button
                                    type="primary"
                                    shape="round"
                                    icon="form"
                                    style={{marginRight: 12}}
                                    data-id={_.Id}
                                    onClick={_tabbarHandle}
                                  >编辑</Button>
                                  <Button
                                    type="danger"
                                    shape="round"
                                    icon="delete"
                                    data-id={_.Id}
                                    onClick={this.removeTabBarHandle}
                                  >删除</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    return htmlStr
                  })
                }
                {/*{this.state.items.map((item, index) => (*/}
                  {/*<Draggable key={item.id} draggableId={item.id} index={index}>*/}
                    {/*{(provided, snapshot) => (*/}
                      {/*<div*/}
                        {/*ref={provided.innerRef}*/}
                        {/*{...provided.draggableProps}*/}
                        {/*{...provided.dragHandleProps}*/}
                        {/*style={getItemStyle(*/}
                          {/*snapshot.isDragging,*/}
                          {/*provided.draggableProps.style*/}
                        {/*)}*/}
                      {/*>*/}
                        {/*{item.content()}*/}
                      {/*</div>*/}
                    {/*)}*/}
                  {/*</Draggable>*/}
                {/*))}*/}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Spin>
    );
  }
}

Drag.propTypes = {
  initData: PropTypes.array,
  _gridHandle: PropTypes.func,
  _swiperHandle: PropTypes.func,
  _tabbarHandle: PropTypes.func,
  _titleHandle: PropTypes.func,
  dispatch: PropTypes.func,
};


export default Drag
