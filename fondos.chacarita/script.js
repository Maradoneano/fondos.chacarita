'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//  CHACARITA DONACION


const cuenta1 = {
  owner: 'Diego Gomez',
  movements: [200, 450,  3000, 70],
  pin: 1111,
};

const cuenta2 = {
  owner: 'Facundo Castro',
  movements: [5000, 3400, 8500],
  pin: 2222,
};

const cuenta3 = {
  owner: 'Juan Kastro',
  movements: [200, 340, 50, 400],
  pin: 3333,
};

const cuenta4 = {
  owner: 'Jorge Castro',
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
};

const cuentas = [cuenta1, cuenta2, cuenta3, cuenta4];





/////////////////////////////////////////////////
// Elementos
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


////Funciones


const displayMovements = function(movements){
containerMovements.innerHTML = ''

 movements.forEach(function(mov, i){

  const type = mov > 0 ? 'deposit' : 'error'

  const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
  `;
  containerMovements.insertAdjacentHTML('afterbegin', html)
 })
}

displayMovements(cuenta1.movements)


const createUsernames = function (cts){
cts.forEach(function(ct){
  ct.username = ct.owner
  .split (' ')
  .map (name => name[0])
  .join('')
})
}

createUsernames(cuentas)


//FUNCTION QUE ACTUALIZA LA PAG
const updateUI = function(){
//Mostrar movements
displayMovements(currentCuenta.movements)
//Mostrar balance
calcDisplayBalance(currentCuenta.movements)

}

console.log(cuentas);

const movements = [70, 3000, 450, 200];

console.log(movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} PESOS`
}
calcDisplayBalance(cuenta1.movements)

const balance = movements.reduce(function(acc, cur){
  return acc + cur;
}, 100)
console.log(balance);



/////EVENTOS - LOG IN
let currentCuenta;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

currentCuenta =  cuentas.find(cts => cts.username === inputLoginUsername.value)
console.log(currentCuenta);

if(currentCuenta.pin === Number(inputLoginPin.value)){
 //Mostrar UI
 labelWelcome.textContent = `Bienvenido de vuelta, ${currentCuenta.owner}`
 containerApp.style.opacity = 100;
}
updateUI(currentCuenta)
})






//Mostrar movements


//Depositando plata


btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if(amount > 0) {
    currentCuenta.movements.push(amount);

    updateUI(currentCuenta)
  }
  inputLoanAmount.value = '';
});




///cerrar cuenta




btnClose.addEventListener('click', function(e){
  e.preventDefault()
  

  if(inputCloseUsername.value === currentCuenta.username && Number(inputClosePin.value) === currentCuenta.pin) {
     const index = cuentas.findIndex(cts => cts.username === currentCuenta.username)

   console.log(index);
     //Cerrando la cuenta
    cuentas.splice(index, 1)


    //Escondiendo el UI

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''
})




