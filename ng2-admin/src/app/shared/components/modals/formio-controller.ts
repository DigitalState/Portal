
import { Observable } from 'rxjs/Observable';


export interface FormioController {
    /**
     * Invoked to request form data from the controller.
     */
    requestFormioForm(): Observable<any>;

    /**
     * Invoked when form is submitted with input values from the form passed in `formData`.
     * @return Observable
     */
    submitFormioForm(formData: any): Observable<any>;

    /**
     * Invoked for various events during the form's lifecylce.
     * @param eventName
     * @param event
     */
    handleFormioFormEvent(eventName: string, event: any);
}