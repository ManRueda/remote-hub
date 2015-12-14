///<reference path="../typings/tsd.d.ts" />

import Mouse = require('./Mouse');
import * as http from 'http';
import socket = require('socket.io');
import debug = require('debug');

let log = debug('remoteControl:Server');

export module RemoteServer{
	export enum ServerEvents{
		MouseMove
	}
	export module ServerEvents{
		export function name(type: ServerEvents): string {
			return ServerEvents[type];
		}
	}
	
	export class RemoteServer {
		
		io: SocketIO.Server;
		mouse: Mouse.Mouse;
		app: http.Server;
		
		constructor(){
			log('Server creation');
			let self = this;
			this.mouse = new Mouse.Mouse();
			this.app = http.createServer();
			this.io = socket(this.app);
			
			
			this.app.listen(8885, () => {
				log('HTTP Server created');
	
				self.mouse.on(Mouse.MouseEventType.name(Mouse.MouseEventType.Moved), function(event: Mouse.MouseEvent){
					log('Mouse event detected');
					self.io.emit(ServerEvents.name(ServerEvents.MouseMove), event);
				});
				
				self.mouse.start();
			});
		}
	}
}