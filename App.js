
//импорт библиотек
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font'

//подгружаем шрифты
Font.loadAsync({
	'DelaGothicOne': require('./assets/fonts/DelaGothicOne-Regular.ttf'),
	'GolosText': require('./assets/fonts/GolosText-VariableFont_wght.ttf'),
})


const numList = []
var i = 0

while( i <= 100 ){
	numList[i] = i
	i++
}

var deg2 = 0//переменная для анимации
var rotate = 0//количество оборотов анимацииы
var flag = 0

export default function App() {


	const [ number , setNumber ] = useState( 'Go  ' ) //Надпись/Число в центре круга
	const [ size , setSize ] = useState( 40 ) //Размер надписи в центре круга(чтобы все уместилось)
	const [ numColor , setNumColor ] = useState( '#AD06FF' ) //цвет надписи
	const [ warnColor , setWarnColor ] = useState( '#000' ) //Цвет предупреждения
	const [ i , setI ] = useState( 0 ) //Номер числа в центре круга


	const [ list , setList ] = useState( [] ) //Список допустимых чисел
	const [ lastLine , setLastLine ] = useState( '' ) //Список допустимых чисел
	//Функция для записи новых чисел в список допустимых
	const updateList = (e) => {

		if ( e.length > 0 ){

			setLastLine(e)
			let result = e.match( /(-?\d+(\.\d+)?)/g ).map( v => +v );
			setList( result )

		}else{
			setLastLine('')
		}

	}


	//Функция вывода результата 
	const generate = () => {

		var str = ''
		updateList(lastLine)

		if ( i >= list.length ){

			setI(0)
			setWarnColor('red')
			setTextInputColor(['#575757', '#1F1F1F'])
			setSize(40)
			setNumber('Go')

		}else{

			Keyboard.dismiss()
			setWarnColor('#000')
			setTextInputColor(['#000', '#000'])

			setI(i + 1)

			setNumber(list[i])
			
			str = '' + list[i]

			if (str.length > 10){
				setSize(10)
			}else if (str.length > 7){
				setSize(20)
			}else if (str.length > 5){
				setSize(30)
			}else if (str.length > 2){
				setSize(40)
			}else{	
				setSize(60)
			}
			

		}


	}


	



	const [ deg , setDeg ] = useState( 90 ) //Переменная для анимации
	const [ MainColor , setMainColor ] = useState('#AD06FF') //Цвет круга
	const [ GradientColors , setGradientColors ] = useState( [ MainColor, MainColor, MainColor, MainColor, '#000', '#000' ] ) //Цвета круга



	//Функция для создания анимации
	const [ interval , setInterv ] = useState( 0 );
	if ( interval == 0 ){
		setNumber('Go  ')
		setNumColor('purple')
		setInterv( 1 )
		setInterval( function(){
			deg2 = deg2 + 1
			setDeg(deg2)
			if(deg2%180 == 0){
				rotate++
			}

			var col = 'purple'
			if (rotate%3 == 0){
				col = '#AD06FF'
			}else if (rotate%3 == 1){
				col = '#402BFF'
			}else if (rotate%3 == 2){
				col = '#FF402B'
			}


			
			setGradientColors([ col, col, col, col, '#000', '#000' ] )
			setNumColor(col)

			
		} , 5 )
	}


	const [ TextInputColor , setTextInputColor ] = useState(['#000','#000']) 

	return (

		<View style={styles.container}>


			<StatusBar backgroundColor='#000'></StatusBar>


			<Text style={styles.title}>JETTERTEAM {'\n'} SOFT</Text>
			

			<Text style={[{color:warnColor} , styles.warn]}>Введите числа</Text>


			<LinearGradient style={[styles.gradient1,{transform:[{ rotate: (-2*deg2)+'deg' }]}]} colors={GradientColors} onStartShouldSetResponder={generate}>


				<View style={[styles.round1,{transform:[{ rotate: 3*deg2+'deg' }]}]} onStartShouldSetResponder={generate}>

					<LinearGradient style={[styles.gradient2,{transform:[{ rotate: (deg2) +'deg' }]}]} colors={GradientColors} onStartShouldSetResponder={generate}>


						<View style={[styles.round2,{transform:[{ rotate: -2 * deg2+'deg' }]}]} onStartShouldSetResponder={generate}>


							<Text style={[{fontSize:size, color:numColor} , styles.number]}>{number}</Text>


						</View>


					</LinearGradient>
	

				</View>


			</LinearGradient>

			<TextInput style={[styles.input, {color: TextInputColor[0], backgroundColor:TextInputColor[1]}]}
						placeholderTextColor={TextInputColor[0]}
						placeholder='Числа...'
						onChangeText={updateList}
						value={lastLine}
						cursorColor={TextInputColor[0]}>
			</TextInput>

			
		


		</View>

	);
	


}



const styles = StyleSheet.create({


	container: {

		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor: '#000',

	},


	title:{

		textAlign: 'center',
		fontSize:33,
		color:'#fff',
		fontFamily: 'DelaGothicOne'

	},


	warn: {
		
		marginTop: 20,

		fontSize:17,
		fontFamily: 'GolosText'

	},


	gradient1:{

		alignItems: 'center',
		justifyContent: 'center',

		width:250,
		height:250,

		marginTop:20,

		borderRadius:300,

	},


	gradient2:{

		alignItems: 'center',
		justifyContent: 'center',
		
		width:216,
		height:216,
		
		borderRadius:300,

	},


	round1:{

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor:'#000',
		
		width:235,
		height:235,

		borderRadius:300,

	},


	round2:{

		alignItems: 'center',
		justifyContent: 'center',

		backgroundColor:'#000',

		width:200,
		height:200,

		padding: 20,

		borderRadius:300,

	},


	number:{

		fontFamily: 'DelaGothicOne',
		textAlign:'center'
		
	},


	input:{

		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		
		width:'70%',
		padding:10,
		marginTop:40,

		borderRadius: 10,
		
		fontSize:20,
		fontFamily: 'GolosText',

	}


});
