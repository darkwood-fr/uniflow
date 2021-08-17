import React from 'react';
import { graphql } from 'gatsby';
import { Feed } from '../views';
import { requireAuthentication, withPage } from '../helpers';
import routes from '../routes';
import { Path } from '../services'
import Container from '../container';

const container = new Container()
const path = container.get(Path)

export default ({ location, data: { localFlows } }) => {
  const allFlows = {};
  localFlows.nodes.forEach((flow) => {
    allFlows[flow.name] = flow.uniflow;
  });

  const FeedPage = withPage(Feed, 'feed', {
    location: location,
    title: 'Feed',
    description: 'Feed',
  });
  const AuthFeedPage = requireAuthentication(FeedPage);

  const match = path.matchPath(location.pathname, {
    path: routes.feed.path,
    exact: true,
  });
  if (match) {
    return <AuthFeedPage allFlows={allFlows} />;
  }

  return <FeedPage allFlows={allFlows} />;
};

export const query = graphql`
  query {
    localFlows: allNpmLocalPackage(filter: { fields: { catalogs: { in: "flow" } } }) {
      nodes {
        name
        uniflow {
          clients
          name
          tags
        }
      }
    }
  }
`;
