import { React, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getChannelsNames } from '../../selectors.js';
import { closeModalWindow } from '../../store/modalSlice.js';
import { setCurrentChannelId } from '../../store/channelSlice.js';
import SocketContext from '../../contexts/socketContext';

const getValidationSchema = (channels) => Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .required('modalWindow.errors.required')
        .min(3, 'modalWindow.errors.minLength')
        .max(20, 'modalWindow.errors.maxLength')
        .notOneOf(channels, 'modalWindow.errors.uniq'),
});

export const AddNewChannelModal = () => {
    const dispatch = useDispatch();
    const { isOpened } = useSelector((state) => state.modalsWindows);
    const channels = useSelector(getChannelsNames);
    const { t } = useTranslation();
    const socket = useContext(SocketContext);
    //console.log(socket.callbacks);

    const handleCloseWindow = () => {
        dispatch(closeModalWindow());
    };

    return (
        <>
            <Modal show={isOpened} centered>
                <Modal.Header>
                    <Modal.Title>{t('modalWindow.title')}</Modal.Title>
                    <Button
                        variant="close"
                        type="button"
                        onClick={handleCloseWindow}
                        aria-label="Close"
                        data-bs-dismiss="modal"
                    />
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: '' }}
                        validationSchema={getValidationSchema(channels)}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit= { (values, { setSubmitting }) => {
                            setSubmitting(false);
                            //console.log(values);
                            socket.emit('newChannel', { name: values.name }, (response) => {
                                console.log("id = " + response.data);
                                const { id } = response.data;
                                dispatch(setCurrentChannelId(id));
                                console.log("ok");
                                console.log(response);
                            });
                            handleCloseWindow();
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        className="mb-2"
                                        autoFocus={true}
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={errors.name}
                                    />
                                    {errors.name ? (
                                        <Form.Control.Feedback type='invalid'>{t(errors.name)}</Form.Control.Feedback>
                                    ) : null}
                                </Form.Group>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        className="me-2"
                                        variant="secondary"
                                        type="button"
                                        onClick={handleCloseWindow}
                                    >
                                        {t('modalWindow.reset')}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                    >
                                        {t('modalWindow.send')}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </ Formik>
                </Modal.Body >
            </ Modal >
        </>
    );
};

//const mappingForWindowType = {
//  addChannel: AddNewChannelModal,
//};

/*const ModalWindow = () => {
    const dispatch = useDispatch();
    const { isOpened } = useSelector((state) => state.modalsWindows);
    console.log("is opened");
    console.log(isOpened);
    const handleCloseWindow = dispatch(closeModalWindow());

    const { modalType } = useSelector((state) => state.modalsWindows);
    console.log("modalType");
    console.log(modalType);
    const ModalComponent = mappingForWindowType[modalType];
    console.log("modal component: ");
    console.log(ModalComponent);

    return (
        <Modal show={isOpened} onHide={handleCloseWindow} centered>
            {ModalComponent && <ModalComponent handleClose={handleCloseWindow} />}
        </ Modal>
    );
}

export default ModalWindow;*/
