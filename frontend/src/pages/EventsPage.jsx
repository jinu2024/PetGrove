import React from 'react';
import Header from '../components/Layout/Header';
import EventCard from '../components/Home/Events/EventCard';
import useGetEvents from '../hooks/getEvents';
import { useRecoilValue } from 'recoil';
import { allEventsState } from '../recoil/atoms/allevents';

const EventsPage = () => {
  const allEvents = useRecoilValue(allEventsState);

  return (
    <div>
      <Header activeHeading={4} />
      <div className="container mx-auto px-4 mt-2">
        {allEvents.map((event) => (
          <EventCard key={event._id} data={event} active={true} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
