// Real Google reviews, copied word for word from the business's Google profile
// on 11/11/2026 (via /api/reviews). GoogleReviews.jsx shows these until the
// live reviews load, and keeps them if the live call fails, so the site never
// shows a review that is not on Google.
//
// Rules: never edit the wording, never add a review that is not on Google,
// and never add one that names another business (hideReview in
// heroReviews.js). The date is the month the review was posted.
export const GOOGLE_REVIEWS_SEED = [
  {
    "authorAttribution": {
      "displayName": "Mark Sullivan"
    },
    "rating": 5,
    "text": {
      "text": "Excellent, professional service from start to finish. Our roof had years of built-up mould and dirt, etc and it now looks absolutely brand new. The technician did an incredible job clearing away all the grime without missing a single spot. He was meticulous, careful around our gutters and plants, and cleaned up perfectly afterwards.  The transformation has completely boosted our home's street appeal.  Will definitely use them again. 10 out of 10."
    },
    "relativePublishTimeDescription": "October 2026"
  },
  {
    "authorAttribution": {
      "displayName": "Deb Hawkins"
    },
    "rating": 5,
    "text": {
      "text": "I am really pleased with job on sandstone tiles. They had turned 50 shades of black with all the recent rain. The 2 young men on this job were very pleasant and professional. Happy to keep up maintenance now if it means our tiles look this good."
    },
    "relativePublishTimeDescription": "July 2026"
  },
  {
    "authorAttribution": {
      "displayName": "Helen L Wong"
    },
    "rating": 5,
    "text": {
      "text": "Dean washed our roof for us! He is a very humble and friendly person! He is very responsible. He did a great job! We highly recommend Dean to anyone who needs a roof cleaning! It is hard job to do, walking on the roof under the sun and working from 9-4. I think he deserves a pay raise! Good job Dean!"
    },
    "relativePublishTimeDescription": "November 2025"
  },
  {
    "authorAttribution": {
      "displayName": "Ruth Mender"
    },
    "rating": 5,
    "text": {
      "text": "Dean come to my home for roof cleaning , and I couldn’t be happier with the experience. From start to finish, his professionalism, attention to detail, and quality of work were outstanding. He arrived on time, communicated clearly about what needed to be done, and completed the job efficiently without cutting corners. Everything was kept clean and tidy, and he took the time to ensure I was fully satisfied before wrapping up.\n\nHighly recommended,  great customer service Dean\nAnd keep smiling, the world needs more people like you."
    },
    "relativePublishTimeDescription": "December 2025"
  }
];

// Rating and review count on the Google profile on the same date.
export const GOOGLE_RATING_SEED = 5.0;
export const GOOGLE_REVIEW_COUNT_SEED = 95;
