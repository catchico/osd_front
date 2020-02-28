import React, { Component } from "react";
import styled from "styled-components";
import Button from "components/Commons/Button";
import FileIcon from "components/Commons/FileIcon";
import Loading from "components/Commons/Loading";
import { AddController, Controller } from "components/Commons/InputItem";

const ContentForm = async (data) => {
  let formData = {
    updateContent: [],
    newContent: [],
    deleteContent: []
  }
  formData.deleteContent = await [...data.deleteContent];
  await data.content.map(async item => {
    delete item.target;
    console.log(item, item.uid)
    if (item.uid) {
      await formData.updateContent.push(item);
    } else {
      await formData.newContent.push(item);
    }
  });
  return formData;
}

const CardSrcWrap = styled.div`
  background-color: #fff;
  margin: auto;
  & form {
    margin: 20px 0;
  }
  & .ui.loader {
    top: auto;
    bottom: 70vh;
  }
`;

const ViewContent = styled.div`
  position: relative;
  .imgContent{
    img{
      max-width: 100%;
    }
    text-align: center;
    margin-bottom: 2rem;
  }
  .LinkFileName {
    line-height: 70px;
    font-size: 20px;
  }
  .iconWrap {
    display: block;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    margin-bottom: 2rem;
  }
  .textWrap{
    margin-bottom: 2rem;
  }
  & .goEdit {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover .goEdit {
    display: block;
  }
`;

const Nodata = styled.div`
  text-align: center;
`;
const ButtonContainer = styled.div`
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  .content-edit-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-edit-button {
    width: max-content;
    padding: 7px;
    padding-bottom: 1px;
    border: none;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
  .content-add-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-add-button {
    width: max-content;
    border: none;
    padding: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
`;

const EditorBottonWrapper = styled.div`
    width: max-content;
    margin: auto;
    margin-top: 10px;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 25px;
    z-index: 907;
    .submit {
      margin-left: 5px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #FF0000;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
    .cancel {
      margin-left: 10px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
`;
class CardSourceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      content: this.props.content,
      deleteContent: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ content: this.props.content });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.content !== prevProps.content) {
      this.setState({ content: this.props.content });
      return true;
    }
  }

  onChangValue = async data => {
    console.log(data, "1");
    let copyContent = [...this.state.content];
    delete data.initClick;
    delete data.target;
    await copyContent.splice(data.order, 1, data);

    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        return item;
      })
    );

    await this.setState({ content: copyContent });
  };

  onAddValue = async data => {
    let copyContent = [...this.state.content];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.content_type === "FILE" && item.fileUrl == null) && (item.content_type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);

    // let newContent = [];
    //copyContent = copyContent.map((item, index) => {
    //  if(item != null){
    //    newContent.push(item);
    //  }
    //})
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.content_type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ content: newContent });
  };

  deleteItem = async index => {
    let copyContent = [...this.state.content];
    let copyDelete = [...this.state.deleteContent];
    if (copyContent[index].uid) {
      copyDelete.push(copyContent[index]);
    }
    await copyContent.splice(index, 1);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        delete item.target;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent, deleteContent: copyDelete });
  };

  onSubmit = async e => {
    e.preventDefault();
    let copyContent = [...this.state.content];
    for (let item of copyContent) {
      if ((item.content_type === "FILE" && item.fileUrl == null) && (item.content_type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1);
      }
    }
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        item.order = await index;
        return item;
      })
    );
    await this.setState({ content: copyContent });
    let formData = await ContentForm(this.state);
    await this.setState({ loading: true });
    await setTimeout(() => { }, 500);
    if (this.props.uid === "local") {
      this.props.upDateRequest(formData);
    }
    else
      this.props.upDateRequest(formData, this.props.uid, this.props.token)
        .then(this.props.UpdateDesignTime(this.props.design_id, this.props.token))

    await this.setState({ loading: false });
  }


  render() {
    const { /*edit,*/ content } = this.state;

    const PrivateContent = () =>
      <div style={{ padding: "25px 10px", borderRadius: "15px", textAlign: "center", fontSize: "25px", color: "#707070", backgroundColor: "#EFEFEF" }}>
        비공개 아이템 항목입니다. 이 항목을 열람하시고 싶으시다면 이 아이템을 구매해주세요.
          </div>
    console.log(this.props);
    return (
      <CardSrcWrap>
        {this.props.edit ? (
          <form onSubmit={this.onSubmit}>
            {content.length > 0 && content.map((item, index) =>
              <Controller
                name={`content${index}`} type={item.type}
                order={index} maxOrder={content.length - 1}
                key={index} item={item}
                deleteItem={this.deleteItem} getValue={this.onChangValue} />)}

            <AddController
              name="addBasic" type="INIT"
              order={content.length > 0 ? content.length : 0}
              getValue={this.onAddValue} />

            <ButtonContainer >
              <EditorBottonWrapper>
                <button onClick={this.onSubmit} className="submit" type="button">
                  <i className="icon outline save" />저장</button>
                <button onClick={() => this.setState({ content: "" })} className="cancel" type="button">
                  <i className="icon trash" />취소</button>
              </EditorBottonWrapper>
            </ButtonContainer>
          </form>
        ) : null}

        {!this.props.edit ?
          content.length > 0 ? (
            <ViewContent>
              {content.map((item, index) =>
                item.private === 1 && !this.props.bought ?
                  <PrivateContent key={index} /> :
                  item.content_type === "FILE" && item.data_type === "image" ? (
                    <div className="imgContent" key={index}>
                      <img key={index} src={item.content} alt="이미지" download={item.file_name} />
                    </div>
                  ) : item.content_type === "FILE" && item.data_type === "video" ? (
                    <span>
                      <span className="LinkFileName">{item.file_name}</span>
                      <video key={index} width="640" height="360" controls="controls" className="iconWrap" >
                        <source src={item.content} type="video/mp4" download={item.file_name}></source>
                      </video>
                    </span>
                  ) : item.content_type === "FILE" && item.data_type !== "image" && item.data_type !== "video" ? (
                    <a key={index} href={item.content} download={item.file_name} className="iconWrap">
                      <FileIcon type={item.data_type} extension={item.extension} />
                      <span className="LinkFileName">{item.file_name}</span>
                    </a>
                  ) : item.content_type === "TEXT" ? (
                    <div
                      className="textWrap"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: `${item.content}` }}
                    />
                  ) : null
              )}
            </ViewContent>
          ) : (<Nodata>
            {/* {this.props.isTeam === 1 ?<Button round={true} color="Primary" size="small" onClick={this.props.openEdit}>업로드</Button>:<div>등록된 컨텐츠가 없습니다.</div>} */}
          </Nodata>) : null}

        {this.state.loading && <Loading />}
      </CardSrcWrap>
    );
  }
}

export default CardSourceDetail;
