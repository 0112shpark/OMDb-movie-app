import { Component } from "../core/my";

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: "footer",
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
    <div>
      <a href="https://github.com/0112shpark/OMDb-movie-app">
        Github Repository
      </a>
    </div>
    <div>
      <a href="https://github.com/0112shpark">
        ${new Date().getFullYear()}
        0112shpark
      </a>
    </div>
    
    `;
  }
}
