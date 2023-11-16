import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
// import { animateScroll } from 'react-scroll';

const Channel = ({ channelName, isRemovable, isCurrent }) => {

    const { t } = useTranslation();
    const isChoosenBtn = isCurrent ? 'secondary' : null;
    return (
        <li className="nav-item w-100">
            <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                    type="button"
                    className="w-100 rounded-0 text-start text-truncate btn"
                    variant={isChoosenBtn}
                    onClick={() => console.log('Choose!')}
                >
                    <span className="me-1">#</span>
                    {channelName}
                </Button>
                {isRemovable ? (
                    <>
                        <Dropdown.Toggle split className="flex-grow-0">
                            <span className="visually-hidden">{'Channel menu'}</span>
                        </Dropdown.Toggle>

                        < Dropdown.Menu >
                            <Dropdown.Item onClick={() => console.log('Delete!')}>{t('chatPage.delete')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => console.log('Reneme!')}>{t('chatPage.rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </>)
                    : (
                        null
                    )
                }
            </Dropdown>
        </li >
    );
};

const ChannelsBox = () => {
    const { t } = useTranslation();
    const channels = useSelector((state) => state.channels.channels);
    //console.log('!!!!!!!!!!!! channels: ' + JSON.stringify(channels));

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('chatPage.channels')}</b>
                <Button
                    type="button"
                    variant="group-vertical"
                    className="p-0 text-primary"
                >
                    <PlusSquare size={20} />
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul
                id="channels-box"
                className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
            >
                {channels.map((channel) => (
                    <Channel
                        channelName={channel.name}
                        key={channel.id}
                        isRemovable={channel.removable}
                        isCurrent={channel.isCurrent}
                        handleChoose={() => console.log('Choose Chanel!')}
                        handleRemove={() => console.log('Delete Chanel!')}
                        handleRename={() => console.log('Rename Chanel!')}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ChannelsBox;
