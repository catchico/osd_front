import React, { Component } from "react"

class TextFormat extends Component {
    render() {
        const txt = this.props.txt;
        const lines = undefined || this.props.lines;
        const chars = undefined || this.props.chars;
        return (
            <div title={txt} style={lines ?
                /* multi-lines*/{ padding: "0 0 0 0", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", wordWrap: "break-word" }
                /* single-line*/ : { padding: "0 0 0 0", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {chars ? (txt && txt.length < chars ? txt : txt && txt.slice(0, chars - 3) + "...") : txt}
            </div>
        )
    }
}

export default TextFormat