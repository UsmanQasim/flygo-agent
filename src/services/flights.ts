import { Axios } from "./axios";

type Passangers = {
  adults: number;
  children: number;
  infants: number;
};

type originDest = {
  origin: string;
  destination: string;
  depart_date: string;
  return_date?: string;
};

interface ISearchFlightProps {
  originDest: originDest[];
  passengers: Passangers;
}

interface ISearchFlightResponse {
  success: boolean;
  message: string;
  data: IAirlineDetails[];
}

export interface IAirlineDetails {
  legs: [
    {
      origin: string;
      destination: string;
      duration: number;
      flight_classes: [
        {
          bookingCode: string;
          cabinCode: string;
          mealCode: string;
          seatsAvailable: number;
        },
        {
          bookingCode: string;
          cabinCode: string;
          mealCode: string;
          seatsAvailable: number;
          availabilityBreak: true;
          fareBreakPoint: true;
        }
      ];
      connecting_flights: number;
      schedules: [
        {
          arrival: {
            airport: string;
            city: string;
            country: string;
            time: string;
            terminal: string;
            date: string;
          };
          departure: {
            airport: string;
            city: string;
            country: string;
            time: string;
            date: string;
          };
          elapsedTime: number;
          totalMilesFlown: number;
          airline: {
            name: string;
            logo: string;
          };
          carrier: {
            marketing: string;
            marketingFlightNumber: number;
            operating: string;
            operatingFlightNumber: number;
            equipment: {
              code: string;
              typeForFirstLeg: string;
              typeForLastLeg: string;
            };
          };
        },
        {
          arrival: {
            airport: string;
            city: string;
            country: string;
            time: string;
            date: string;
          };
          departure: {
            airport: string;
            city: string;
            country: string;
            time: string;
            terminal: string;
            date: string;
          };
          elapsedTime: number;
          totalMilesFlown: number;
          airline: {
            name: string;
            logo: string;
          };
          carrier: {
            marketing: string;
            marketingFlightNumber: number;
            operating: string;
            operatingFlightNumber: number;
            equipment: {
              code: string;
              typeForFirstLeg: string;
              typeForLastLeg: string;
            };
          };
        }
      ];
    }
  ];
  baseFareAmount: number;
}

export const searchFlight = async (data: ISearchFlightProps) => {
  try {
    const response = await Axios.post<ISearchFlightResponse>(
      "/sabre/flights",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

//

export type personalData = {
  given_name: string;
  sur_name: string;
  dob: string;
  gender: string;
  Document: {
    ExpirationDate: string;
    Number: string;
    Type: string;
    IssueCountry: string;
    NationalityCountry: string;
  };
};

type flightData = {
  bookingCode: string;
  departure_date_time: Date;
  origin: string;
  destination: string;
  marketing_airline: {
    code: string;
    flight_number: string;
  };
};

export interface ICompleteBookingProps {
  agentId: number;
  seatsRequested: number;
  flights: flightData[];
  air_price: {
    total_fare: number;
  };
  passengers: {
    adults: personalData[];
    children: personalData[];
    infants: personalData[];
  };
  customer_info: {
    phone: string;
    email: string;
  };
}

interface ICompletedBookingData {
  status: string;
  Success: [
    {
      timeStamp: Date;
    }
  ];
  ItineraryRef: {
    AirExtras: boolean;
    ID: string;
    InhibitCode: string;
    PartitionID: string;
    PrimeHostID: string;
    Header: [string];
    Source: {
      AAA_PseudoCityCode: string;
      CreateDateTime: string | Date;
      CreationAgent: string;
      HomePseudoCityCode: string;
      PseudoCityCode: string;
      ReceivedFrom: string;
      LastUpdateDateTime: string | Date;
      SequenceNumber: string;
    };
  };
  FlightSegment: [
    {
      ArrivalDateTime: string | Date;
      DepartureDateTime: string | Date;
      eTicket: boolean;
      FlightNumber: string;
      NumberInParty: string;
      ResBookDesigCode: string;
      Status: string;
      DestinationLocation: {
        LocationCode: string;
      };
      MarketingAirline: {
        Code: string;
        FlightNumber: string;
      };
      OriginLocation: {
        LocationCode: string;
      };
    }
  ];
}

interface ICompleteBookingFlightResponse {
  success: boolean;
  message: string;
  data: ICompletedBookingData;
}

export const completeBookingFlight = async (data: ICompleteBookingProps) => {
  try {
    const response = await Axios.post<ICompleteBookingFlightResponse>(
      "/sabre/flights/book",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};


export const DownloadInvoiceData = async (id:string) => {
  try {
    const response = await Axios.get(`/sabre/flights/invoice/${id}`);
    if (response.data.success) return response.data.data;
  } catch (error) {}
};

