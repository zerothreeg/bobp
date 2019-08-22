import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Panel, Group, Div, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';
class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		if(window.location.hash){
			this.setState({
				hash: window.location.hash.slice(1)
			})
		}
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppOpenPayFormResult': 	
					fetch("https://cors-anywhere.herokuapp.com/http://83.166.240.249:3000/success?user_id="+this.state.fetchedUser.id+"&pay_id="+this.state.hash)
					.then(response => response.json())
					.then(data => {
						console.log("Success")
					})
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Panel id="home">
					<img src="https://promocodes.vkforms.ru/uploads/img/5cdbc74108dc4.jpg" style={{width: "100%", marginTop: "-60px"}} />
					<Group>
						<Div style={{fontSize: "0.8em"}}>
							<h1>Заголовок</h1>
							<h3>99.99 рублей</h3>
							<p style={{marginTop: "20px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						    <Button before={<Icon24LogoVk/>} size="l" onClick={() => connect.send("VKWebAppOpenPayForm", {"app_id": 7105689, "action": "pay-to-user", "params": {"amount": 1, "user_id": 144944981}})}>Оплатить с VK Pay</Button>
						</Div>
					</Group>
					<Group>
						<Div>
							<p style={{fontSize: "0.8em"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</Div>
					</Group>
					<Group>
						<div style={{display: "flex", marginLeft: "15px"}}>
							<img src="http://www.femkreations.com/projects/wrap-circle/circle-image.jpg" style={{width: "70px"}} />
							<div style={{marginLeft: "10px", marginTop: "5px"}}>
								<a href="#" target="_blank" style={{color: "#2a5885", fontWeight: 500, textDecoration: "none", lineHeight: 0}}>HS Public</a>
								<p style={{lineHeight: 0}}>Наше сообщество</p>
							</div>
						</div>
					</Group>
				</Panel>
			</View>
		);
	}
}

export default App;
