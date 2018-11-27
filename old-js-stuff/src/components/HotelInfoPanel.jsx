import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import currencyFormatter from 'currency-formatter';
import CollapsibleInfo from './CollapsibleInfo';
import InfoItem from './InfoItem';

const createAddressLineElement =
  addressLine => ({ id: shortid.generate(), value: addressLine });

const createAdditionElement =
  addition => ({ id: shortid.generate(), value: addition });

const getAddressComp =
  address => (address.map((addressLine) => {
    const { id, value } = createAddressLineElement(addressLine);
    return <p key={id}>{value}</p>;
  }));

const checkIfAdditionSelected =
  (selectedAdditions, { id }) => (selectedAdditions.includes(x => id === x.id));

const getSelectedAdditionsComp =
  (selectedAdditions, additions) => (
    additions.map((addition) => {
      if (addition.included || checkIfAdditionSelected(selectedAdditions, addition)) {
        const additionElement = createAdditionElement(addition);
        return <p key={additionElement.id}>{additionElement.value.description} (Included)</p>;
      }
      return null;
    })
  );

const getProfileImageUrlComp =
  (profileImageUrl) => {
    if (profileImageUrl.urls[0]) {
      return (
        <div className="hotel-image">
          <img className="detail-icon" alt="" src={profileImageUrl.urls[0]} />
        </div>
      );
    }
    return null;
  };

const HotelInfoPanel =
    ({
      reference,
      bookingId,
      currency,
      totalRoomRate,
      cancelAmendTerms,
      address,
      profileImageUrl,
      phone,
      email,
      roomType,
      additions,
      selectedAdditions,
    }) => {
      const includedAdditions = getSelectedAdditionsComp(selectedAdditions, additions)
        .filter(ad => (ad !== null));
      return (
        <div className="info-panel">
          <InfoItem
            label="Address"
            displayText={getAddressComp(address)}
            fullWidth
          />
          <InfoItem
            label="Phone"
            displayText={phone}
            href={`tel:${phone}`}
          />
          <InfoItem
            label="Email"
            displayText={email}
            href={`mailto:${email}`}
          />
          {getProfileImageUrlComp(profileImageUrl)}
          <InfoItem
            label="Reference"
            displayText={reference}
          />
          <InfoItem
            label="Room Type"
            displayText={roomType}
            fullWidth
          />
          <InfoItem
            label="Additions"
            displayText={includedAdditions.length ? includedAdditions : 'None'}
          />
          <InfoItem
            label="Booking ID"
            displayText={bookingId}
          />
          <InfoItem
            label="Total Rate"
            displayText={currencyFormatter.format(totalRoomRate, { code: currency })}
          />
          <CollapsibleInfo
            title="Cancellation policy"
            info={cancelAmendTerms}
          />
        </div>
      );
    };

HotelInfoPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  totalRoomRate: PropTypes.string.isRequired,
  cancelAmendTerms: PropTypes.string.isRequired,
  address: PropTypes.arrayOf(PropTypes.string).isRequired,
  profileImageUrl: PropTypes.shape({}).isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string,
  roomType: PropTypes.string.isRequired,
  additions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedAdditions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

HotelInfoPanel.defaultProps = {
  email: 'Not recorded',
  phone: 'Not recorded',
};

export default HotelInfoPanel;
