import {observable, decorate, action} from 'mobx';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import WarningOutlined from '@material-ui/icons/WarningOutlined';

class ToastStore {
    constructor(rootStore){
        this.rootStore = rootStore
        this.toast = {
            open: false,
            message: '',
            variant: '',
            icon: CheckCircleOutline, //default otherwise react complains
        }
    }
    
    showWithMessage(message){
        this.toast.message = message
        this.toast.open = true
        setTimeout(() => this.toast.open = false, 2000)
    }

    snackbarSuccess(message){
        this.toast.variant = 'success'
        this.toast.icon = CheckCircleOutline
        this.showWithMessage(message)
    }

    snackbarInfo(message){
        this.toast.variant = 'info'
        this.toast.icon = InfoOutlined
        this.showWithMessage(message)
    }

    snackbarWarning(message){
        this.toast.variant = 'warning'
        this.toast.icon = WarningOutlined
        this.showWithMessage(message)
    }
    
    snackbarError(message){
        this.toast.variant = 'error'
        this.toast.icon = ErrorOutline
        this.showWithMessage(message)
    }
}

decorate(ToastStore, {
    toast: observable,
    snackbarSuccess: action,
    snackbarInfo: action,
    snackbarWarning: action,
    snackbarError: action,
})

export default ToastStore