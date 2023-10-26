import React from "react"
import PropTypes from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {SyntaxHighlighter, getStyle} from "core/syntax-highlighting"
import get from "lodash/get"
import { requestSnippetGenerator_python_bash } from "../plugins/request-snippets/fn"

export default class Python extends React.Component {
  static propTypes = {
    getConfigs: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
  }

  render() {
    let { request, getConfigs } = this.props
    let python = requestSnippetGenerator_python(request)

    const config = getConfigs()

    const pythonBlock = get(config, "syntaxHighlight.activated")
      ? <SyntaxHighlighter
          language="bash"
          className="python microlight"
          style={getStyle(get(config, "syntaxHighlight.theme"))}
          >
          {python}
        </SyntaxHighlighter>
      :
      <textarea readOnly={true} className="python" value={python}></textarea>

    return (
      <div className="python-command">
        <h4>python</h4>
        <div className="copy-to-clipboard">
            <CopyToClipboard text={python}><button/></CopyToClipboard>
        </div>
        <div>
          {pythonBlock}
        </div>
      </div>
    )
  }

}
