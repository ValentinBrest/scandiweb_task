import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Seclect from "../UI/Select/Seclect";
import cl from "./Header.module.css";
import Minibag from "./MiniBag/MiniBag";

class Header extends Component {

	switchMiniBag = (isMinibagOpen) => {
		this.props.openMinibag(isMinibagOpen);
	};

	render() {

		return (
			<>
				<div className={cl.header}>
					<div className="container">
						<div className={cl.header__wrap}>
							<ul className={cl.categoties}>
								{this.props.categories.map((item) => (
									<li key={item.name} className={cl.categoties_item} >
										<NavLink to={item.name}
                                                className={({ isActive }) => isActive ? cl.link_active : "" }
                                                onClick={() => this.switchMiniBag(false) }
										>
											{item.name}
										</NavLink>
									</li>
								))}
							</ul>

							<div className={cl.wrap}>
								<Seclect currencies={this.props.currencies}
                                        getCurrency={this.props.getCurrency}
                                        symbol={this.props.symbol}
								/>

								<div className={cl.cart} onClick={() => this.switchMiniBag(true)} >
									{this.props.totalProd > 0 
                                    	? <div className={cl.prod__total}> {this.props.totalProd} </div> 
                                    	: "" 
                                    }
								</div>
							</div>
						</div>

						{this.props.isMinibagOpen 
                            ? <Minibag
								orders={this.props.orders}
								symbol={this.props.symbol}
								totalProd={this.props.totalProd}
								switchMiniBag={this.switchMiniBag}
								addInCounters={this.props.addInCounters}
								counters={this.props.counters}
								updateOrders={this.props.updateOrders}
								totalAmount={this.props.totalAmount}
							/>
                            : ""
						}
					</div>

					<div className={cl.logo} /><div />
				</div>
				{this.props.isMinibagOpen 
                    ? <div className={cl.overlay} onClick={() => this.switchMiniBag(false)} ></div>
                    : ""
                }
				<Outlet/>
			</>
		);
	}
}

export default (Header);
