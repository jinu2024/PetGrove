import React from 'react';
import styles from '../../../styles/styles';
import EventCard from './EventCard.jsx';
import useGetAllEvents from '../../../hooks/getAllEvents';
import { useRecoilValue } from 'recoil';
import { allEventsState } from '../../../recoil/atoms/allevents.js';

const Events = () => {
  const { loading } = useGetAllEvents();
  const allEvents = useRecoilValue(allEventsState);


  if (loading) {
    return <div className={`${styles.section}`}>Loading...</div>;  // Display loading state
  }

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          {allEvents && allEvents.length > 0 ? (
            <EventCard data={allEvents[0]} />
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
