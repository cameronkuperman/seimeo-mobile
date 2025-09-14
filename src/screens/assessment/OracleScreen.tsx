import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface SuggestedPrompt {
  id: string;
  text: string;
  icon: string;
}

const OracleScreen: React.FC = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hello! I'm your AI health assistant. I can help you understand symptoms, answer health questions, and provide guidance. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      id: '1',
      text: 'What could be causing my headache?',
      icon: 'help-circle-outline',
    },
    {
      id: '2',
      text: 'Explain my test results',
      icon: 'document-text-outline',
    },
    {
      id: '3',
      text: 'Natural remedies for better sleep',
      icon: 'moon-outline',
    },
    {
      id: '4',
      text: 'When should I see a doctor?',
      icon: 'medical-outline',
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your concern. Let me analyze this for you...",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handlePromptPress = (prompt: SuggestedPrompt) => {
    setInputText(prompt.text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Oracle AI</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="ellipsis-vertical" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <Animated.View
              key={message.id}
              style={[
                styles.messageRow,
                message.sender === 'user' && styles.messageRowUser,
                { opacity: fadeAnim },
              ]}
            >
              {message.sender === 'ai' && (
                <View style={styles.aiAvatarContainer}>
                  <View style={styles.aiAvatar}>
                    <Icon name="sparkles" size={16} color="#9B87F5" />
                  </View>
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.sender === 'user' && styles.messageBubbleUser,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'user' && styles.messageTextUser,
                  ]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    message.sender === 'user' && styles.messageTimeUser,
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </Animated.View>
          ))}
          
          {isTyping && (
            <View style={[styles.messageRow]}>
              <View style={styles.aiAvatarContainer}>
                <View style={styles.aiAvatar}>
                  <Icon name="sparkles" size={16} color="#9B87F5" />
                </View>
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={[styles.typingDot, styles.typingDotDelayed1]} />
                <View style={[styles.typingDot, styles.typingDotDelayed2]} />
              </View>
            </View>
          )}

          {/* Suggested Prompts (only show when no conversation) */}
          {messages.length === 1 && (
            <View style={styles.promptsContainer}>
              <Text style={styles.promptsTitle}>Try asking about:</Text>
              {suggestedPrompts.map((prompt) => (
                <TouchableOpacity
                  key={prompt.id}
                  style={styles.promptCard}
                  onPress={() => handlePromptPress(prompt)}
                  activeOpacity={0.9}
                >
                  <Icon name={prompt.icon} size={18} color="#9B87F5" />
                  <Text style={styles.promptText}>{prompt.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about your health..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
              onSubmitEditing={handleSend}
              blurOnSubmit={false}
            />
            <TouchableOpacity 
              style={styles.voiceButton}
              activeOpacity={0.7}
            >
              <Icon name="mic" size={20} color="#9B87F5" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && styles.sendButtonActive,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            activeOpacity={0.9}
          >
            <Icon 
              name="send" 
              size={18} 
              color={inputText.trim() ? Colors.white : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  menuButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  aiAvatarContainer: {
    marginRight: 8,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9B87F515',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: screenWidth * 0.7,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  messageBubbleUser: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  messageText: {
    fontSize: 15,
    color: Colors.black,
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  messageTextUser: {
    color: Colors.white,
  },
  messageTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    letterSpacing: -0.2,
  },
  messageTimeUser: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9B87F5',
    opacity: 0.4,
  },
  typingDotDelayed1: {
    opacity: 0.6,
  },
  typingDotDelayed2: {
    opacity: 0.8,
  },
  promptsContainer: {
    marginTop: 24,
  },
  promptsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderLeftWidth: 2,
    borderLeftColor: '#9B87F5',
  },
  promptText: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
    maxHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
    lineHeight: 20,
    letterSpacing: -0.3,
    paddingTop: 0,
    paddingBottom: 0,
  },
  voiceButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E5E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#9B87F5',
  },
});

export default OracleScreen;