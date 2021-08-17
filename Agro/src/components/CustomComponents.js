import {Button, TouchableRipple, Appbar, Avatar} from 'react-native-paper';
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const MobileScreen = Dimensions.get('screen');
const finalWidth = MobileScreen.width - 30;
const finalModalHeight = MobileScreen.height - 300;
const modalInputHeight = finalModalHeight - 100;

export const PrimarySmallButton = styled(Button)`
  background-color: ${props => props.theme.colors.brand.primary};
  font-family: ${props => props.theme.fonts.monospace};
  color: ${props => props.theme.colors.text.primary};
`;

export const PrimaryMediumButton = styled(Button)`
  background-color: ${props => props.theme.colors.brand.primary};
  font-family: ${props => props.theme.fonts.monospace};
  padding: ${props => props.theme.space[2]};
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
  border-radius: 50px;
`;

export const SecondarySmallButton = styled(Button)`
  background-color: ${props => props.theme.colors.brand.secondary};
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.text.primary};
`;

export const SecondaryMediumButton = styled(Button)`
  background-color: ${props => props.theme.colors.brand.secondary};
  font-family: ${props => props.theme.fonts.body};
  padding: ${props => props.theme.space[2]};
  color: ${props => props.theme.colors.text.primary};
  font-weight: 900;
  border-radius: 50px;
`;
export const PageView = styled(View)`
  flex: 1;
  padding-horizontal: ${props => props.theme.space[3]};
  padding-vertical: ${props => props.theme.space[3]};
  height: auto;
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const PageSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
export const Title = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.fontSizes.title};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: ${props => props.theme.lineHeights.title};
`;
export const SubTitle = styled(Text)`
  color: ${props => props.theme.colors.brand.primary};
  font-size: ${props => props.theme.fontSizes.subtitle};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: ${props => props.theme.lineHeights.copy};
`;

export const BodyText = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.fontSizes.body};
  font-weight: ${props => props.theme.fontWeights.regular};
  line-height: ${props => props.theme.lineHeights.copy};
`;
export const InputBox = styled(TextInput)`
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.ui.primary};
  border-width: 2px;
  border-color: ${props => props.theme.colors.ui.disabled};
  border-style: solid;
  height: 50px;
  border-radius: 5px;
`;

export const StatusView = styled(View)`
  width: 100%;
  align-items: center;
  text-align: center;
`;

export const ErrorText = styled(Text)`
  color: ${props => props.theme.colors.text.error};
  font-size: ${props => props.theme.fontSizes.body};
`;
export const SuccessText = styled(Text)`
  color: ${props => props.theme.colors.text.success};
  font-size: ${props => props.theme.fontSizes.body};
`;
export const PageKeyboardAwareScrollView = styled(KeyboardAwareScrollView)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const SuggestionViewBox = styled(KeyboardAwareScrollView)`
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.theme.colors.bg.primary};
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.bg.primary};
  width: 100%;
  top: 50px;
  max-height: 150px;
  position: absolute;
  z-index: 999999999;
  elevation: 3;
`;
export const TouchableOpacityBox = styled(TouchableOpacity)`
  padding: 5px;
`;

export const ModalText = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
  font-size: 16px;
  font-weight: 700;
`;

export const TouchableModalButton = styled(TouchableRipple)`
  background-color: ${props => props.theme.colors.brand.primary};
  width: 100%;
  align-items: center;
  elevation: 3;
  border-radius: 50px;
  padding: ${props => props.theme.space[3]};
`;

export const AppbarHeader = styled(Appbar.Header)`
  background-color: ${props => props.theme.colors.bg.component};
  padding: 10px;
  height: 65px;
  elevation: 6;
`;

export const PredictionView = styled(View)`
  flex-direction: column;
  min-height: 220px;
  border-radius: 20px;
  padding: 10px;
  background-color: ${props => props.theme.colors.bg.component};
  justify-content: center;
  elevation: 20;
`;
export const PredictionRowView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Caption = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
`;

export const ImagePickerModalView = styled(View)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.1);
`;

export const ResultView = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const ResultRowView = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const ListItemPressable = styled(Pressable)`
  background-color: ${props => props.theme.colors.brand.primary};
  elevation: 4;
  border-radius: 20px;
`;

export const ListItemView = styled(View)`
  width: ${finalWidth}px;
  border-radius: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemText = styled(Text)`
  color: ${props => props.theme.colors.ui.tertiary};
  font-size: ${props => props.theme.fontSizes.subtitle};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: ${props => props.theme.lineHeights.copy};
`;

export const ErrorModalView = styled(View)`
background-color: ${props => props.theme.colors.ui.primary};
padding-horizontal: 10px;
padding-vertical: 20px
margin-horizontal: 20px;
align-items: center;
border-radius: 10px;
`;

export const AvatarImage = styled(Avatar.Image)`
  background-color: ${props => props.theme.colors.bg.primary};
  elevation: 3;
  resize-mode: center;
`;
