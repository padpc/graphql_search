import React ,{Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {Query} from 'react-apollo'
import client from './client';
import {SERCH_REPOSITORIES} from './graphql'

const DEFAULT_STATE = {
  first :5,
  after :null,
  last :null,
  before :null,
  query :"フロントエンドエンジニア"
}


class  App extends Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      ...DEFAULT_STATE,
      query:event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render(){
    const { query,first,last,before,after} = this.state
    console.log({query})
    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange}/>
        </form>
        <Query query={SERCH_REPOSITORIES}
               variables={{query,first,last,before,after}} 
        >
          {
            ({ loading,error,data}) => {
              if(loading) return 'Loading...'
              if(error) return `Error! ${error.message}`

              console.log(data.search)
              return <h2>GitHub Repositories Search Results - {data.search.repositoryCount} Repositories</h2>
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App;
