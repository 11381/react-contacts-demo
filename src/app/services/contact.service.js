export default class ContactService {
    constructor(){
        this.endpoint = "http://localhost:5000/api/Contact";
    }

    getAll(){
        return fetch(this.endpoint)
            .then(r => this.handleErrors(r))
            .then(r => r.json());
    }

    getById(id){
        return fetch(`${this.endpoint}/${id}`)
            .then(r => this.handleErrors(r))
            .then(r => r.json());
    }

    save(contact){
        if(contact.id){
            return this.update(contact);
        }

        return this.create(contact);
    }

    create(contact){
        return fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(r => this.handleErrors(r))
            .then(r => r.json());
    }

    update(contact){
        return fetch(`${this.endpoint}/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        }).then(r => this.handleErrors(r));
    }

    delete(id){
        return fetch(`${this.endpoint}/${id}`, {
            method: 'DELETE'
        }).then(r => this.handleErrors(r));
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}