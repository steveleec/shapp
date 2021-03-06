'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import AllArticles from './AllArticles';

import globalVar from '../../utils/globalVariables';
import helpers from '../../utils/dbHelper';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  AlertIOS,
  TextInput,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity,
  ActivityIndicatorIOS,
} = React;

export default class PublishArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      savingData: false,
    };
  }

  handlePublishPress() {
    this.setState({savingData: true});
    var url = `${globalVar.restUrl}/api/makerarticlecreate`;

    if (this.state.title === '') {
      this.alertIOS('Title not provided.', 'Write an enticing title!');
      return;
    }

    if (this.state.content === '') {
      this.alertIOS('Content not provided.', 'Write some content!');
      return;
    }

    var body = {};
    !!this.state.title ? body.title = this.state.title : null;
    !!this.state.content ? body.content = this.state.content : null;
    !!this.state.tags ? body.tags = this.state.tags : null;

    if (this.props.userInfo.fbId) {
      body.fbId = this.props.userInfo.fbId;
    } else {
      body._id = this.props.userInfo._id;
    }

    fetch(helpers.requestHelper(url, body, 'POST'))
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({savingData: false});
        console.log(responseData);
        if (responseData.condition === 'done') {

          this.props.navigator.push({
            component: AllArticles,
            articles: this.props.route.articles,
            navigationBar: (
              <NavigationBar
                title={<Text style={styles.titleSignUp}>ARTICLES</Text>}
                style={styles.navigationBar}
                tintColor={'#285DA1'}
                statusBar={{style: 'light-content', hidden: false}}
                leftButton={
                  <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
                    <Image
                      source={require('../../img/back-icon.png')}
                      style={[{ width: 15, height: 15}]}/>
                  </TouchableOpacity>}
                rightButton={
                  <TouchableOpacity style={styles.buttonNavBar} onPress={()=> this.props.navigator.pop()}>
                    <Text style={styles.rightButton}>Publish</Text>
                  </TouchableOpacity>}/>
            )
          });

          this.setState({
            title: '',
            content: '',
            tags: '',
          })

        } else {
          this.alertIOS('An error occurred', 'Try again!');
        }
      })
      .catch(function(error) {
          console.log('request failed', error)
        })
      .done();
  }

  alertIOS(title, message) {
    AlertIOS.alert(title, message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <View style={styles.title}>
          <Text style={styles.titleText}>Share your knowledge with the</Text>
          <Text style={styles.titleText}>world!</Text>
        </View>

        <this.props.route.progressBar
          progress={this.props.route.progress}
          widthContainer={this.props.route.widthContainer}/>

        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          style={styles.fields}>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>TITLE</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
              <View style={{flex: 1}}>
                <TextInput
                  value={this.state.title}
                  style={styles.inputBox}
                  placeholder="Title (e.g. New frontiers in web development)"
                  onChangeText={(title) => this.setState({title})}/>
              </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>CONTENT</Text>
            </View>
          </View>

          <View style={[styles.fieldContainer, {height: 150}]}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.content}
                style={[styles.inputBox, {height: 150, paddingTop: 10}]}
                multiline={true}
                placeholder="(e.g. The breakthrough technology developer by FB...)"
                onChangeText={(content) => this.setState({content})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>TAGS</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View style={{flex: 1}}>
              <TextInput
                value={this.state.tags}
                style={styles.inputBox}
                placeholder="(e.g. finance, tv, economy, art, wood, glod, etc)"
                onChangeText={(tags) => this.setState({tags})}/>
            </View>
          </View>

          <View style={styles.titleFieldBar}>
            <View style={{flex: 1}}>
              <Text style={styles.fieldName}>MEDIA: ADD VIDEO OR PICTURE</Text>
            </View>
          </View>

        </ScrollView>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.handlePublishPress.bind(this)}
            style={styles.iconPublish}>
            <Text style={styles.textPublish}>PUBLISH</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  titleSignUp: {
    fontFamily: 'Avenir',
    fontWeight: '500',
    fontSize: 15,
    color: 'white',
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
  },
  rightButton: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 16,
    paddingRight: 7
  },
  title: {
    height: 85,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 18
  },
  titleFieldBar: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: '#F2F2F2',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  fieldName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 11,
    marginLeft: 13,
    textAlign: 'left'
  },
  fieldContainer: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    flexDirection: 'row'
  },
  inputBox: {
    height: 43,
    fontFamily: 'Avenir-Book',
    fontWeight: "100",
    fontStyle: 'italic',
    fontSize: 13,
    paddingLeft: 13,
    textAlign: 'left'
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 43,
    width: window.width,
  },
  iconPublish: {
    flex: 1,
    height: 43,
    alignItems: 'center',
    backgroundColor: '#285DA1',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#D1D1D1'
  },
  textPublish: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
