import React from 'react';
import DummyShop from './DummyShop';

class DummyShops extends React.Component {
    render() {
        let elements = [];

        for (let i = 0; i < this.props.count; i++) {
            elements.push(i);
        }

        return (
            <div>
                {elements.map(x => (
                    <DummyShop key={x} />
                ))}
            </div>
        );
    }
}

export default DummyShops;
