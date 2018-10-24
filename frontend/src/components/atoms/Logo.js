import React, { Component } from 'react';
import logopath from '../../img/Logo/green_horn_full.svg';

export class Logo extends Component {


  render() {

    return (
				<embed src={logopath} alt="GreenHorn"/>
			);
		}
}
