export const LOAD_ALL_BOOKING = 'LOAD_ALL_BOOKING'

export function getAllBooking({allBooking}) {
  return {
    type: LOAD_ALL_BOOKING,
    allBooking
  }
}