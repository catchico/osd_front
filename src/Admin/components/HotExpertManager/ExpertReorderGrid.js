import React from 'react';
import { ListManager } from "react-beautiful-dnd-grid";
import Expert from "Admin/Commons/Expert/Expert"

function sortList(list) {
    return list.slice().sort((first, second) => first.order - second.order);
}
// function ListElement({ item: { nick_name, categoryName, type, m_img, uid }, handle }) {
//     // : "협상/상담"
//     // category_level1: 2
//     // category_level2: 1
//     // create_time: "2020-02-12T08:30:23.000Z"
//     // imgURL: null
//     // update_time: "2020-02-12T08:30:23.000Z"
//     // user_id: 3
//     return <div style={{
//         position: "relative",
//         backgroundSize: "cover",
//         backgroundImage: `url(${m_img})`,
//         width: "150px",
//         height: "150px",
//         borderRadius: "5px",
//         marginRight: "5px",
//         marginBottom: "5px",
//     }}>
//         <div
//             onClick={() => handle(uid)}
//             style={{
//                 cursor: "pointer",
//                 padding: "5px 10px",
//                 marginLeft: "auto",
//                 width: "max-content",
//                 color: "white",
//                 backgroundColor: "red",
//                 borderRadius: "15px",
//             }}>삭제</div>
//         <div style={{
//             bottom: "0px",
//             width: "100%",
//             position: "absolute",
//             padding: "5px",
//             backgroundColor: "#707070",
//         }}>
//             <div title={nick_name} style={{
//                 padding: "1px 2px",
//                 fontSize: "16px",
//                 height: "20px",
//                 width: "100%",
//                 color: "white",
//                 wordWrap: "break-word",
//                 overflow: "hidden",
//                 whiteSpace: "nowrap",
//                 textOverflow: "ellipsis"
//             }}>
//                 {nick_name}</div>
//             <div title={categoryName + "," + type} style={{
//                 padding: "1px 2px",
//                 fontSize: "12px",
//                 height: "16px",
//                 width: "100%",
//                 color: "white",
//                 overflow: "hidden",
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//             }}>
//                 <div>{categoryName}</div>
//                 <div>{type === "designer" ? "디자이너" : "메이커"}</div>
//             </div>
//         </div>
//     </div>
// }

class ExpertReorderGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedList: sortList(props.list) || [],
        }
    }
    sortList = () => {
        this.setState({
            ...this.state,
            sortedList: sortList(this.state.sortedList)
        })
    };
    reorderList = (sourceIndex, destinationIndex) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const list = this.state.sortedList;
        if (destinationIndex === 0) {
            list[sourceIndex].order = list[0].order - 1;
            this.sortList();
            return;
        }
        if (destinationIndex === list.length - 1) {
            list[sourceIndex].order = list[list.length - 1].order + 1;
            this.sortList();
            return;
        }
        if (destinationIndex < sourceIndex) {
            list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
            this.sortList();
            return;
        }
        list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
        this.sortList();
    };
    onApply = () => {
        let job = [];
        let special = Array.from(this.state.sortedList);
        let origin = Array.from(this.props.list);

        //update
        special.forEach((item, i) => {
            if (item.order !== i && item.order !== null) {
                console.log(item);
                job.push({ uid: item.uid, type: item.type, data: { order: i, type: "update" } });
                item.order = i;
            }
        })

        // delete
        origin.forEach(item => {
            const found = special.find(specialItem => specialItem === item);
            console.log(found);
            if (found) {
                return;
            } else {
                job.push({ uid: item.uid, type: item.type, data: { type: "delete" } });
            }
        });

        // update
        if (job && job.length === 0) {
            alert("변경된 내용이 없습니다.");
        } else {
            if (!window.confirm("변경된 내용을 저장하시겠습니까?")) return;
            this.props.update(job);
        }
    };
    removeFromSortedList = (id) => {
        let copy = [...this.state.sortedList];
        copy.splice(this.state.sortedList.findIndex(item => item.uid === id), 1);
        this.setState({ sortedList: copy });
    };
    render() {
        const { sortedList } = this.state;
        console.log(sortedList)
        return (<React.Fragment>
            <div style={{ margin: "10px" }}>
                <button style={{ padding: "5px", borderRadius: "5px", outline: "none" }} onClick={this.onApply}>변경내용저장</button>
            </div>
            {sortedList && sortedList.length > 0 ?
                <React.Fragment>
                    <ListManager
                        items={sortedList}
                        direction="horizontal"
                        maxItems={5}
                        render={item =>
                            <Expert
                                data={item}
                                removeLabel={"삭제"}
                                handleDel={(id) => this.removeFromSortedList(id)}
                            />}
                        onDragEnd={this.reorderList}
                    />
                </React.Fragment>
                :
                <React.Fragment>
                    {/*  */}
                </React.Fragment>}
        </React.Fragment >);
    }
}
export default ExpertReorderGrid;