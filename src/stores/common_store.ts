import { makeObservable, observable, action } from 'mobx'

export class CommonStore {
    
    loading:boolean = false;

    constructor() {
        makeObservable(this, {
            loading: observable,
            toggleLoading: action
        });

    }
    
    toggleLoading(loading: boolean) {
        this.loading = loading;
    }
}

export const observableCommonStore = new CommonStore();