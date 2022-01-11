import { Observable, Subscriber, Observer, Subscription } from "rxjs";

/******************************
 * CREAMOS EL OBSERVABLE  ****
 * ***************************/
const intervalo$ = new Observable<number>((subscriber) => {
  let count: number = 0;

  const inter = setInterval(() => {
    count++;
    subscriber.next(count);
  }, 1000);

  setTimeout(() => {
    subscriber.complete(); //termina el observable en 2.5 segundos
  }, 2500);

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

//2)creamos las suscripciones
const miSubs1: Subscription = intervalo$.subscribe(miObserver);
const miSubs2: Subscription = intervalo$.subscribe(miObserver);
const miSubs3: Subscription = intervalo$.subscribe(miObserver);

miSubs1.add(miSubs2);
miSubs1.add(miSubs3);

setTimeout(() => {
  miSubs1.unsubscribe();
  console.log("setTimeout completado");
}, 5000);
