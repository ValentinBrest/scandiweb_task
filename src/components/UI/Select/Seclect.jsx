import React, { Component, createRef } from "react";
import cl from "./Select.module.css";

class Seclect extends Component {
	constructor(props) {
		super(props);
		this.state = { isSelectOpen: false };
	}

    componentDidMount() {document.addEventListener("mousedown", this.closeSelect);}

	componentWillUnmount() {document.removeEventListener("mousedown", this.closeSelect);}

    selectRef = createRef();

	closeSelect = (event) => {
		if (
			this.selectRef.current &&
			!this.selectRef.current.contains(event.target)
		) {
			this.setState({ isSelectOpen: false });
		}
	};

	toggleSelect = (isSelectOpen) => {
		this.setState({ isSelectOpen: isSelectOpen });
	};

	handleClick = (symbol) => {
		this.props.getCurrency(symbol);
		this.toggleSelect(false);
	};

	render() {
		return (
			<div className={cl.select} ref={this.selectRef}>
				<div
					className={cl.header}
					onClick={() => {
						this.toggleSelect(
							this.state.isSelectOpen ? false : true
						);
					}}
				>
					<span className={cl.current}>{this.props.symbol}</span>
					{this.state.isSelectOpen 
                        ? <div className={cl.icon__open}></div>
                        : <div className={cl.icon__close}></div>
					}
				</div>

				{this.state.isSelectOpen 
                    ? <div className={cl.body}>
                            {this.props.currencies.map((cur) => (
                                <div
                                    className={cl.item}
                                    key={cur.symbol}
                                    onClick={() => this.handleClick(cur.symbol)}
                                >
                                    <span>{cur.symbol}</span>
                                    <span>{cur.label}</span>
                                </div>
                            ))}
                        </div>
                    : ""
                }
			</div>
		);
	}
}

export default Seclect;
