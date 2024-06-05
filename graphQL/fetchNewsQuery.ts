import { gql } from "@apollo/client";

const fetchNewsQuery = gql`
  query MyQuery(
    $access_key: String
    $categories: String
    $countries: String
    $limit: String
    $offset: String
    $languages: String
  ) {
    newsQuery(
      access_key: $access_key
      categories: $categories
      countries: $countries
      limit: $limit
      offset: $offset
      languages: $languages
    ) {
      pagination {
        count
        limit
        offset
        total
      }
      data {
        author
        category
        country
        description
        image
        language
        published_at
        source
        title
        url
      }
    }
  }
`;

export default fetchNewsQuery;
