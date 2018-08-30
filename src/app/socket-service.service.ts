import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketServiceService {

    private serverUrl = 'http://localhost:3000'
    private socket = socketIo(this.serverUrl)

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: any): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public onEventCB(event: any, cb) {
        this.socket.on(event, cb);
    }

    public emit(event: any, data, cb?) {
        this.socket.emit(event, data, cb);
    }
}
