import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

    Dimensions,
    TouchableHighlight,
    Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';

var width = Dimensions.get('window').width;
export default class topBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    _goBack() {
        this.props.navigator.pop()
    }

    _profile() {
        this.props.navigate('Profile');
    }

    _onReder() {
        if (this.props.onPhoto) {
            return (
                <View style={styles.nav}>
                    <TouchableHighlight underlayColor='#FFF' style={{flex: 1}} onPress={() => this._goBack()}>
                        <Image source={require('../images/backk.png')} style={{width: 20, height: 20}}/>
                    </TouchableHighlight>
                    <Text style={{flex: 1, textAlign: 'center'}}>{this.props.title}</Text>
                    <Text style={{flex: 1, textAlign: 'center'}}>..</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.nav}>
                    <View style={{flex: 1}}>
                        <TouchableHighlight onPress={this._profile.bind(this)}>
                            <Image style={{marginLeft: 5, width: 25, height: 25}}
                                   source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAACXBIWXMAAAsSAAALEgHS3X78AAADfklEQVRo3t2a3XGbQBDH/2byDh1AB6KD0MBO1EFIBaEEpYLgCoI60Mw2gDrAHaAORAXOgxcZ4QNxd4us8c4weXAQ+7v9ZNmn19dXaAozpwAyACmABEAEYDP6by8AzgBaAA2AmogaTT2eNMCYeQugv0LHn+kAHAAciOjwaWDMHAnIDkAMXTkBKAFURHS+Gxgz5ysBmaxYEFG1KhgzJwAqAN9xXzkK4OI4DCyt1HwCFOSZteigZzFmrgD8xGPInohybzAlqJO4cDMoA6mhDKjBzYJ5Qp0kwbQAGlN2k5jNARQOZWIWbhKMmUsAvx2h/hDRzrJ0HBzidxLOCCZB+s8xPWeuXYSjh/wylYNgwj1KR9dLPFujQg7HRkpp426m+8qxLSpcu4Re5H7bQw1N9wQGF3SpU51GfydSu9S5cY0bW2znqIxqZ+4opSShazAhjh9AQddDCqV0fLDY7gGg4BmnxRUYM2ee1lLrH00ZzkJieTe8WCxXUChRYos8778C2yoopAWWqoCJ6cMHUKiXzPP+kJnTQEmho/R6GtJqHI4W2JmINBQCERUaYaEFlilZq8/Q3mERKOkTeqZp7UOKAsUatH0gsI2WxVTApK1TKRuaYBtmblxjhJkLebmNtcA6TTgPV0oU9UCwwitHeuf7jHU1gL5EeABZw2KJQ3xF0J0wN2uAxTJtsoGqlHVo1wAD7EZoKYAfys+vAxmXnfB1pCOipk8e9RcCOwwLdPWFwKoLGBHVyu54tMlgis89CctqU6rF01yZSj0rPffCcPVRgplbx16tkzit4bjaIL3iVrJk6GitSw39ZiBe+pXlBe/rC97uRERlb2mZeGWDK7ax1geLyY/WM11AJ8FZao0CFlozxduIcDsBeSSi7BZYIgE9dIcTgJ3LWsIKkAWAv6PDTscHHRhcosXHAeoZelMoH6jIoFth8p5gwt8Po0y1wds6QvTJUDWuP8g/T3lRMBPMBYD9CK5RHNrYxlgzgtrPjeqCG5kqH8HFYrnizjFVj5KG3zrE4MdNGwTWa0CWQAnM603PS4aqi3ep5PNMZSiee8mYrSLQzvDqY7UwprkkdpS/HWw/3g1WBPOZ385tDs91rW8rXUI805U0g2vqBbO/plaPnOun14bpinuL3g2B1ursrZZnKUwt7Zp3QnpaYdm5b2D7fzHq2LuBe9Z4XyJTza7/AX0toeK9+k+4AAAAAElFTkSuQmCC'}}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',}}>
                        <TouchableHighlight onPress={this._profile.bind(this)}>
                            <Image
                                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABFCAYAAAAVZotTAAAACXBIWXMAAAsSAAALEgHS3X78AAAFe0lEQVR42u1b7ZGzNhB+zuP/dgdHKrA7MA1ojg5eUsHrVHB2BeHtgKsgeFRAcAWBCoI7gAqcH15yGt1KQhh8MOOdYebsM2L1aD+eXYmX6/WKuYmUMgCwpUuVGkAhhMh9xnuZCwhSyjWACMAewKbDLScASRdAZgGClDIGkABY9bj9DGAvhChmCQKtfgrgbYDh/hBCJLMCgQDILaZ/AlDQbwAgoCuy3PNLCLGfEwgHAO/a1w25RSKEqB2B8wDgB/Pv34QQlfrFcsKhINdAOAOIbJNvhSYZSylTAJkrliwmDEKtmXHYBQANjBxASK7TADjqVjCHwBgoKzuaeIFAwWpL6KpSAah8ScpUpBMIlKejDqmqIR9M5wSIFQQpZUTR+HUMkjJpEMjsE0OKGYykTBaEDiTlTP+v6NoSSQl9ScpUhOMJW2YyNpKSKwBuiaS8MWNiTiDoUhJJcaYp8v9IShl2ISlTERdZOgEIffO0QlKOdKVzDIwBgPUcIvt3kKWWKAWanxdEc/NH8QNyuS2ANROjCh+K7QSBssUeQNyRLzRk/snQdJcmvu/YXygpmGcuQFxkaU/Rvm+AO7rKXg8LTADsetzeEGlL+5ClzPHQhtxg6wCpBBD3jS+GvoKuQytrB79hS3FfsvRB4OT6YGSqEbnNilE29AWC+gE6a72Qu6WcuykN2ZhZxJL0qI0gWAD4AHDo4uNKDHm/BwgDAEchxMEDRK72+QKEDkKmBR2nPzn8ONesgl0JQyz6815LsizsWQgRfiFLVC6/MQ/uRXRI4ZDGaWVDVuJqpAwCAOlRkx6l8vWOgP4EQakaVbm7DFaAUOW97RgZRAc9GkCPFoiL8vWB5v2/JUSa2Z76WoABiKMOsMUKdlr1mQ+kR03BspVV+3lhUGrosjfR3CI2/G6vucFhSCUI0LP+vAWZxEazgmrgh9eama8opeoSKX9n95Isy4K08iqlDBaMz2Yj0X193JCJ4q9j6yGE+KLHgml4FCM9XPftwNF4GbMQU10iWBgC2VhysYDAudBYoo69XjIRehK7MVLKMS1BXYDtd+5FuoLv7kF6ZN+1F9mMkIb7SAkgXTIrcnIER1tz5djRH1PG52umaLNZi+kcQsOwX06KNlMsmQlXtkpNSglDff/hU+FxAVlK2SjMtbBt2lDM+JvjAb56LCgbqFE7bjm1hWyUDPpDsLu8K2ullPthaKl5yYIhJiubAmTGEblNm3PDgVhmqrG52AFETC54JkDCPqn15Xq9toXLv0OVr3emxkqJOQ2AYGTO8NlUkVImAH76NkA6dJhCCoRpx/siAH8NpYfS4FlTvKtM7gDy6YvWAMlpgL7dnHfK97Entz8xeqx7ApAA+IeCaGyLCaqvN4wCe4+HRpTaNndYaKwF3w2AwlB5GjtUlEF+moq2L+6g3ByC30xtu7yZHisoprQdXm7yv/s2aSxN37OiR83cF5IeP5gMFnFNGtO+A9ck5UhJDfuuVO9GrQKEbf+j1EjWzlK4Gdt0xh2oAU6rnHHbdLk7dd65E/YLt+2C2pkdbL5FCkQdleh8uryHVcQWl9NXPkPH/VDfXekQn7vSgcL5C7rysXO6sjDc+w4V0W0vfvMyx5c+hpYFnvIE4QnCE4QnCE8QniA8QeBlOXUFiR2GRNuzoY4MzAYEpZxuK9U3jHBEeOru0PeFk++3BDp7GJL5Jj3HSJky/jiGvqMUUNqmrldfgWJAyjRISiHEdjaWoMkOt/5gAsMBTGXyMW4dau4waDSWgmNZQmFpfJRt3U+f296A6ffW1tiULSGE+W33DV1dTqp3fjV4cpagWETfVwovuDVoswe462M6SwRGTBZi6lM2xAnSR03+oSAwATDQvq7Gfh/aJv8B2Q7k0qoncpwAAAAASUVORK5CYII='}}
                                style={{alignSelf: 'flex-end', marginRight: 10, width: 25, height: 26}}/>
                        </TouchableHighlight>
                        <View style={{width: 2, height: 25, marginRight: 10, backgroundColor: '#B2B2B2'}}/>
                        <TouchableHighlight onPress={this._profile.bind(this)}>
                            <Image
                                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABBCAYAAABlwHJGAAAACXBIWXMAAAsSAAALEgHS3X78AAAE/ElEQVR42u1bS3KjSBB9JhRspTmBdAMpggNIfQLrBqaXrIYbtPoE1qxYNrqBfAKjAxAj3QCfYNCWjWfhtIMpZWYVkkCf6YxwhANURfF49eplUjy8v79Di8TPRwBGzKkyqoItGkbi5zMAn3/12AJYR1WQ4chI/HwAIAQwYcacUf/smB8cgMgATJlTm6gKZg0GOQGQAhhbfroBEDcFOfHzGMACQN/y0xcAYVQFZf2g5zD4KU4M6idzAAF0vYzauPa/APDsAAIAPFL/A2cgAMQ4T6wdB/kZfQBrc7DK1P3RcDxj8948ywWezsCGOYAhc2pP02BD/5sxpPmOIx/WZ/87l3YaIxZnYsNcGOQoqoIZ6cysQVszZpb+J6QLB6yrTz+vTTZQcCtOWhcrEsYXQS9caK72D2BpG5vXMhskILaOx46N0rFvmREkUHODZrsTBsXpQ4EOw1wqufAEEekbtCo7GC8319+6AqvHsMFU4aUiZi5P48FxCZy2PF0aMcJkw8qFVmeIpeI/ugVCYMOi7QEkfr4kt3cwLaIqSC/BiNBgw0tUBUXLIIQA/mzZ1TYGInak6zlB+CWcXkVVsO4cCBrU0MgsswuCEKLj8AQtSFsEYX5tIACAx7ChNZGq1SS42F0KhE8fYbIhoypSPbh0eFD73da2zNKqJKXju1O8yrmAMC3wk2PCNQbwSv9/o8KLFqlgt3cAZh35lUYWuy1deLxWEDoDQliK9wDm1wBCJ0AoFapF24bNyGWsGvHN8YmOGVrHDskRW6GKqqBNwzaS6g7mwvAFhItxSvyco2/paLq4p1FS5dkWmcM1Nkzm+pT4eRpVQUZskK5VsGl4SzEVijWulWcbEGvhGq+Jn2vtdvWp6eH2IwVfBbfFojOxdHkvcWrQqjNvCMZBUtc2IyZdUIJ0ZEZ6ocUbgO+clbe++7y1IHGcGA+hJOEVV7e7A+LaneVvIH4DcWPRu9SFqZYxqIlaSVa96CoHORBL2hVzYFSkShVVmrhcQd3pUrO7c+j7Jd4oKZOuvxSW5oVmycnWz7hcqqfYYM3aDoQ2A2UQIYHnsmFkCOAXteFS9S341wChNO7aexvu+mFXhZkJPgq2/YZNp+BrnGvBST4pblZi4SqqguKShRnXeDRrqMQQqc9QOB5rOYfXERukDR8rqof8AeC7ki/EDcCNBW3iNpR8vc3rghEz4fjPqArCqAqyqApKEkbpt49CsrXi9IWpwsc2pl4SiCVzc1vh5sDcHJSCS+gwXf7zNq8LIAbCIEql0OLUD9F6o4kmrTx9oY7RqbPk9EEzTEXDlN7GCo4NB2/zLmWxC6W20GiXDNGb2+MVKjtxFveaa3AryFhgw55zrFquMVMqzaML3OxEYUVKYx0eu+z2LHP7pA3pgtKfU3TNG3w2jpkiuZeAuKc0PIW9gJtKq9XdAGGx3Varf2+FmVQ5t9LqHJpG/IyqYKHM/dcrZEWR+PkK/P4OlS1tM6K4Fo9i8yde20/oVubULWlEdo9AjBTvMfg/MWJ0jIO8dSC4NHmqPHkJiO2tAyHdQCxMi/hegZBE7kfi53GtgDLBR1FmKNQPipsGgjZkSJ8kPQP4J/HzdwB/K0ne8h40Ajjt24sdWtwk3ykQxIq/jmj6BuaD9jaipyi7NidLoU2pgBEnfr7GR5nMVufYk17ER4BQwL6F6CAusmNG2N7zJa5tfjQjxb/rs/mSPB6TkQAAAABJRU5ErkJggg=='}}
                                style={{alignSelf: 'flex-end', marginRight: 10, width: 25, height: 25}}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableHighlight onPress={this._profile.bind(this)}>
                            <Image
                                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA2CAYAAAB0pZEqAAAACXBIWXMAAAsSAAALEgHS3X78AAADSElEQVRo3uWb3XGjQBCEP1O8WxlIGVgZGAWwdVwEJoNTCFwEx2WAIjhcmwDOQERgnIEUge9BszaF+VuEJMBdxYONQNv07OxMs7p7f3/nEtBaL4A14AErOQAeKz6eAQc59uZQSuWXGNvdkKS11msgEKIPA9zyDUiBRCmVjIa01nolRANgyeVwBBIgUkrtb0JayIbAE9fHCxAqpdKrkJa5GgK/uD1egMB27juWhH0gHwlhkxRftdbh4EqLutGNQtlGdV8pdTibtBBOB8rGl8YR8NoSndNhCdpPhDDAPZDKuO2VFoVzudHU0Ki40xLSUyTcqnhdeMcTCukm4okI2Exaa70FfjAPLEXA+jktVdZ+wmFdh02xeisrHc6QMGW1nZLKT8wTS611UKV0yLyxrSLtz5z0g1nCnEIjcc/8EQC48od3ZqFvOh4bRyQHFpb1gLGV1j1F8s4lvQO2pqvp2Ikd5Zq4kEA9ue6hhaxf7JulnvhjG+If67TW2tY+eVZK+TUlbNxAfFPldrTU+ZnU0YeaQsqW+MapKtNsMqHFuec6e0cIRTXXhXU9slIqkqliBUfmhw2yJntGBphVnGoz8+oeSNLnugasnB4qL7giOkTi4hqkl1K91Q1yVZOU2pKlb/l/80Bsk3Du9LRR4x7nHoulYIVDU2c2hg1qRz2Wrrxv9jZZdWsemgw86rBe/+Zk2JulLugw+Df5rqQQTVHPFnhjSKeWxcVkoZS6czpm1rkgKzYc6TchnX6Qlrly/Aak43Jrmcw9tI0l/J1MhOiLiSCl5W7GKsdVzolpFuY4t7flhqPcLGxnRvhvuep0KhbveEZhnlXlKqchHLKJEz5y2qVw6ERaPuhNmLj9W8uJE299Me+0FOeG+MtECL/RYSdC591FWuuI8WywqcJwe05KxD2pX5cjC+dQTMJO6LOPzAf+jYTwTgjnNhe5Pb4oGAnZ3tslbcN7BbzeMEmZvaH5OTeyVfraJWrG5y7gwYwO90KhvePTFV1z8qa9wvnHUtY12HN6QZdy2u99uMSTdC1CO6DZsTxKzxqXwi9lZHAHCO1M5lk8lZLN7aiyx9e3Fmdl0CkoHRQyaEzBrJ8i3A4qrzj96OTnkL+juCX+A6zDdghxIspxAAAAAElFTkSuQmCC'}}
                                style={{alignSelf: 'flex-end', marginRight: 10, width: 30, height: 26}}/>
                        </TouchableHighlight>
                    </View>
                </View>

            )
        }
    }

    render() {
        return (
            <View style={styles.topBar}>
                {this._onReder()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    topBar: {
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 10,
        height: 60,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderTopColor: '#FFF',
        borderBottomColor: '#E2E2E2',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF'
    },
    nav: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    }

});
