import React, { Component } from 'react';
import { pathTo } from '../../routes';
import { Link } from 'gatsby';
import ArticleItem from './articleItem';

class Tag extends Component {
  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tag' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    const { tag, articles } = this.props;

    return (
      <section className="section container-fluid">
        <h3>Tag</h3>
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <p>
              {articles.edges.length} posts tagged with <strong>{tag}</strong>
            </p>
            <p>
              <div className="d-grid">
                <Link to={pathTo('tags')} className="btn btn-primary">
                  View all tags
                </Link>
              </div>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {articles.edges.map((item, i) => (
              <div className="row mb-3" key={i}>
                <div className="col-md-6 offset-md-3">
                  <ArticleItem article={item.node} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Tag;