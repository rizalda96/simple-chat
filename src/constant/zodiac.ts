export interface ZodiacType {
  monthDayStart: string;
  monthDayEnd: string;
  holoscope: string;
  zodiac: string;
}

export const ZODIAC: ZodiacType[] = [
  {
    monthDayStart: '03-21',
    monthDayEnd: '04-19',
    holoscope: 'Aries',
    zodiac: 'Ram',
  },
  {
    monthDayStart: '04-20',
    monthDayEnd: '05-20',
    holoscope: 'Taurus',
    zodiac: 'Bull',
  },
  {
    monthDayStart: '05-21',
    monthDayEnd: '06-21',
    holoscope: 'Gemini',
    zodiac: 'Twins',
  },
  {
    monthDayStart: '06-22',
    monthDayEnd: '07-22',
    holoscope: 'Cancer',
    zodiac: 'Crab',
  },
  {
    monthDayStart: '07-23',
    monthDayEnd: '08-22',
    holoscope: 'Leo',
    zodiac: 'Lion',
  },
  {
    monthDayStart: '08-23',
    monthDayEnd: '09-22',
    holoscope: 'Virgo',
    zodiac: 'Virgin',
  },
  {
    monthDayStart: '09-23',
    monthDayEnd: '10-23',
    holoscope: 'Libra',
    zodiac: 'Balance',
  },
  {
    monthDayStart: '10-24',
    monthDayEnd: '11-21',
    holoscope: 'Scorpius',
    zodiac: 'Scorpion',
  },
  {
    monthDayStart: '11-22',
    monthDayEnd: '12-21',
    holoscope: 'Sagittarius',
    zodiac: 'Archer',
  },  
  {
    monthDayStart: '12-22',
    monthDayEnd: '01-19',
    holoscope: 'Capricornus',
    zodiac: 'Goat',
  },
  {
    monthDayStart: '01-20',
    monthDayEnd: '02-18',
    holoscope: 'Aquarius',
    zodiac: 'Water Bearer',
  },
  {
    monthDayStart: '02-19',
    monthDayEnd: '03-20',
    holoscope: 'Pisces',
    zodiac: 'Fish',
  },
];
