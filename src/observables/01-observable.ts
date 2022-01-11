import { Observable, Subscriber, Observer } from "rxjs";

/******************************
 * CREAMOS EL OBSERVABLE  ****
 * ***************************/
//const obs$=Observable.create();//ya esta deprecada esta forma de crear Observables

//Esta es la forma actual de crear observables
const obs$ = new Observable<string>((subscriber) => {
  subscriber.next("Hola");
  subscriber.next("Mundo");

  subscriber.next("Como");
  subscriber.next("estas");

  //forzar error
  // const a = undefined;
  // a.nombre = "erik";

  subscriber.next("yo ");
  subscriber.next("bien");

  subscriber.complete(); //ninguna emision posterior al complete() va a ser notificada a las subscripciones

  subscriber.next("Esto ya no le llegara a las suscriptiones");
});

/*********************************************************************************
 *** AHORA creaamos una suscripcion, para ello suscribimos algo a el observable  *
 *********************************************************************************/

//1.- esta es la forma deprecada de llamar al metodo subscribe
/*obs$.subscribe(
  (valor) => console.log("next: ", valor),
  (error) => console.warn("error-> ", error),
  () => console.log("ya se completó el observable")
);*/

//2.- Esta es la forma recomendada para llamar al metodo suscribe
const observer: Observer<string> = {
  next: (valor) => console.log(`metodo next: ${valor}`),
  error: (error) => console.warn(`metodo error:  ${error}`),
  complete: () => console.log("metodo complete"),
};

obs$.subscribe(observer);
