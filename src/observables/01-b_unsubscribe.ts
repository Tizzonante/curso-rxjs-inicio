import { Observable, Subscriber, Observer, Subscription } from "rxjs";

/******************************
 * CREAMOS EL OBSERVABLE  ****
 * ***************************/
const intervalo$ = new Observable<number>((subscriber) => {
  let count: number = 0;

  const inter = setInterval(() => {
    count++;
    subscriber.next(count);
    /*if (count === 20) {
      // descomenta esta linea si quieres completar el observable despues de 20 segundos
      subscriber.complete();
    }*/
    console.log(count);
  }, 1000);

  /*setTimeout(() => {
    subscriber.complete();//termina el observable en 2.5 segundos
  }, 2500);*/

  return () => {
    //esta funcion se ejecutará cuando se manda a llamar el unsuscribe de cada suscripcion
    //con esto logramos destuir la funcion que se ejecutará cada segundo
    clearInterval(inter);
    console.log("Invervalo destruido");
  };
});

/******************************
 * Creamos una subscripcion ***
 ******************************/

//1) creamos un observer
const miObserver: Observer<number> = {
  next: (numero) => console.log("Impresion en el Observer:", numero),
  error: (err) => console.warn(err),
  complete: () => console.log("ya concluyó el observable"),
};

//2)creamos la subscripcion1
const miSubs1: Subscription = intervalo$.subscribe(miObserver);
let miSubs2: Subscription;

//Nos  desuscribimos despues de 3 seg
setTimeout(() => {
  miSubs1.unsubscribe();
  //no importa cuantas veces mandes a llamar el unsubscribe, pues
  // la funcion que limpia el intervalo solo se ejecutará una vez
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
  miSubs1.unsubscribe();
}, 3000);

//hacemos la subscripcion 2 despues de 6 seg
setTimeout(() => {
  miSubs2 = intervalo$.subscribe(miObserver);
}, 6000);

//dessucribimos la subscripcion 2, despues de 15 segundos
setTimeout(() => {
  miSubs2.unsubscribe();
}, 15000);
