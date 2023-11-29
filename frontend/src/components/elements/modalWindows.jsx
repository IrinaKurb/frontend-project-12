import { React, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getChannelsNames, getCurrentChannel } from '../../selectors.js';
import { closeModalWindow } from '../../store/modalSlice.js';
import { setCurrentChannelId, removeChannel } from '../../store/channelSlice.js';
import SocketContext from '../../contexts/socketContext';
import { toast } from "react-toastify";

const getValidationSchema = (channels) => Yup.object().shape({
    name: Yup
        .string()
        .trim()
        .required('modalWindow.errors.required')
        .min(3, 'modalWindow.errors.minLength')
        .max(20, 'modalWindow.errors.maxLength')
        .notOneOf(channels, 'modalWindow.errors.uniq'),
});

const AddNewChannelModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const channels = useSelector(getChannelsNames);
    const { t } = useTranslation();
    const socket = useContext(SocketContext);

    return (
        <>
            <Modal.Header>
                <Modal.Title>{t('modalWindow.title')}</Modal.Title>
                <Button
                    variant="close"
                    type="button"
                    onClick={handleClose}
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
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        //console.log(values);
                        socket.emit('newChannel', { name: values.name }, (response) => {
                            console.log("id = " + response.data);
                            const { id } = response.data;
                            dispatch(setCurrentChannelId(id));
                            console.log("ok");
                            console.log(response);
                            toast.success(t('modalWindow.channelCreated'), {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        });
                        handleClose();
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
                                    onClick={handleClose}
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
        </>
    );
};

const RemoveChannelModal = ({ handleClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { currentChannelId } = useSelector((state) => state.channelsStore);
    const currentChannel = useSelector(getCurrentChannel);
    //const channels = useSelector(getChannelsNames);
    const socket = useContext(SocketContext);

    const handleRemove = () => {
        socket.emit('removeChannel', { id: currentChannel.id }, () => {
            dispatch(removeChannel({ idChannelForRemove: currentChannelId }));
            //dispatch(addInitialChannel({channels: channels}));
            toast.success(t('modalWindow.channelRemoved'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        });
        handleClose();
    };

    return (
        <>
            <Modal.Header>
                <Modal.Title>{`${t('modalWindow.removeChannel')} "# ${currentChannel.name}"`}</Modal.Title>
                <Button
                    variant="close"
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    data-bs-dismiss="modal"
                />
            </Modal.Header>
            <Modal.Body>
                <p className="lead">{t('modalWindow.conformation')}</p>
                <div className="d-flex justify-content-end">
                    <Button
                        className="me-2"
                        variant="secondary"
                        type="button"
                        onClick={handleClose}
                    //disabled={loading}
                    >
                        {t('modalWindow.reset')}
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={ handleRemove }
                    //disabled={loading}
                    >
                        {t('modalWindow.delete')}
                    </Button>
                </div>
            </Modal.Body>
        </>
    );

}

const mappingForWindowType = {
    addChannel: AddNewChannelModal,
    removeChannel: RemoveChannelModal,
};

const ModalWindow = () => {
    const dispatch = useDispatch();
    const { isOpened } = useSelector((state) => state.modalsWindows);
    console.log("is opened");
    console.log(isOpened);
    const handleCloseWindow = () => { dispatch(closeModalWindow()) };

    const { modalType } = useSelector((state) => state.modalsWindows);
    console.log("modalType");
    console.log(modalType);
    const ModalComponent = mappingForWindowType[modalType];
    //console.log("modal component: ");
    //console.log(ModalComponent);

    return (
        <Modal show={isOpened} onHide={handleCloseWindow} centered>
            {ModalComponent && <ModalComponent handleClose={handleCloseWindow} />}
        </ Modal>
    );
}

export default ModalWindow;
