import { React, useContext, useRef, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getChannelsNames, getCurrentChannel } from '../../selectors.js';
import { closeModalWindow } from '../../store/modalSlice.js';
import { setCurrentChannelId, removeChannel, renameChannel } from '../../store/channelSlice.js';
import SocketContext from '../../contexts/socketContext';
import { toast, ToastContainer } from "react-toastify";

const validationSchema = (channels) => Yup.object().shape({
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

    const [isActiveBtn, setIsActiveBtn] = useState(true);

    const filter = require('leo-profanity');

    const notAddChannel = () => {
        toast.error(t('networkError'), {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    return (
        <>
            <Modal.Header>
                <Modal.Title>{t('channelsInf.addChannel')}</Modal.Title>
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
                    validationSchema={validationSchema(channels)}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        socket.timeout(5000).emit('newChannel', { name: filter.clean(values.name) }, (error, response) => {
                            if (error) {
                                setIsActiveBtn(false);
                                notAddChannel();
                            } else {
                                const { id } = response.data;
                                dispatch(setCurrentChannelId(id));
                                handleClose();
                            }
                        });
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
                                <label className="visually-hidden" htmlFor="name">{t('channelsInf.channelName')}</label>
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
                                    disabled={!isActiveBtn ? "disabled" : null}
                                >
                                    {t('modalWindow.reset')}
                                </Button>
                                <Button
                                    variant="primary"
                                    disabled={!isActiveBtn ? "disabled" : null}
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
    const [isActiveBtn, setIsActiveBtn] = useState(true);
    //const channels = useSelector(getChannelsNames);
    const socket = useContext(SocketContext);

    const notRemoveChannel = () => {
        toast.error(t('networkError'), {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const handleRemove = () => {
        socket.timeout(5000).emit('removeChannel', { id: currentChannel.id }, (error) => {
            if (error) {
                notRemoveChannel();
                setIsActiveBtn(false);
            } else {
                dispatch(removeChannel({ managedChannelId: currentChannelId }));
                handleClose();
            }
        });
    };

    return (
        <>
            <Modal.Header>
                <Modal.Title>{`${t('modalWindow.removeChannel')} # '${currentChannel.name}'`}</Modal.Title>
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
                        disabled={!isActiveBtn ? "disabled" : null}
                    >
                        {t('modalWindow.reset')}
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleRemove}
                        disabled={!isActiveBtn ? "disabled" : null}
                    >
                        {t('modalWindow.delete')}
                    </Button>
                </div>
            </Modal.Body>
        </>
    );
};

const RenameChannelModal = ({ handleClose }) => {
    const dispatch = useDispatch();
    const channels = useSelector(getChannelsNames);
    const currentChannel = useSelector(getCurrentChannel);
    const [isActiveBtn, setIsActiveBtn] = useState(true);
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const socket = useContext(SocketContext);

    const notRenameChannel = () => {
        toast.error(t('networkError'), {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const filter = require('leo-profanity');

    useEffect(() => {
        setTimeout(() => inputRef.current.select());
    }, []);

    return (
        <>
            <Modal.Header>
                <Modal.Title>{t('modalWindow.renameChannel')}</Modal.Title>
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
                    initialValues={{ name: currentChannel.name, id: currentChannel.id }}
                    validationSchema={validationSchema(channels)}
                    validateOnChange={false}
                    validateOnBlur={false}

                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);

                        socket.timeout(5000).emit('renameChannel', { id: values.id, name: filter.clean(values.name) }, (error) => {
                            if (error) {
                                setIsActiveBtn(false);
                                notRenameChannel();
                            } else {
                                dispatch(renameChannel(values));
                                handleClose();
                            }
                        });
                    }}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    id="name"
                                    name="name"
                                    className="mb-2"
                                    ref={inputRef}
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={errors.name}
                                />
                                <label className="visually-hidden" htmlFor="name">{t('channelsInf.channelName')}</label>
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
                                    disabled={!isActiveBtn ? "disabled" : null}
                                >
                                    {t('modalWindow.reset')}
                                </Button>
                                <Button
                                    variant="primary"
                                    disabled={!isActiveBtn ? "disabled" : null}
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

const mappingForWindowType = {
    addChannel: AddNewChannelModal,
    removeChannel: RemoveChannelModal,
    renameChannel: RenameChannelModal,
};

const ModalWindow = () => {
    const dispatch = useDispatch();
    const { isOpened } = useSelector((state) => state.modalsWindows);
    const handleCloseWindow = () => { dispatch(closeModalWindow()) };

    const { modalType } = useSelector((state) => state.modalsWindows);
    const ModalComponent = mappingForWindowType[modalType];

    return (
        <>
            <Modal show={isOpened} onHide={handleCloseWindow} centered>
                {ModalComponent && <ModalComponent handleClose={handleCloseWindow} />}
            </ Modal>
            <ToastContainer />
        </>
    );
}

export default ModalWindow;
