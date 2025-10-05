import React, { useState, useCallback, useEffect } from "react";
import { View, ImageBackground, FlatList, ActivityIndicator, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { styles } from "../../styles/news/NewsStyles";
import CardScreen from "./CardScreen";

const backgroundImage = require("../../assets/fotonews.png");

export default function NewsScreen() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (currentPage = 1, append = false) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(`https://*******.com:****/api/news?page=${currentPage}&limit=2`);
      if (!res.ok) throw new Error("Error loading");

      const result = await res.json();

      if (append) {
        // Attach new news to existing ones
        setNewsList(prev => [...prev, ...result.data]);
      } else {
        // Replace News completely
        setNewsList(result.data);
      }

      setHasMore(result.hasMore);
      setPage(currentPage);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchNews(1, false);
    }, [])
  );

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(page + 1, true);
    }
  };

  const renderItem = ({ item }) => (
    <CardScreen
      newsId={item.newsId}
      title={item.title}
      content={item.content}
      image={item.image}
      createdAt={item.createdAt}
      author={item.author}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="small" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        {loading && !loadingMore ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={newsList}
              renderItem={renderItem}
              keyExtractor={item => item.newsId.toString()}
              initialNumToRender={5}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
              }
              style={styles.flatList}
            />
          )}

          {error && (
            <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
              Loading error: {error}
            </Text>
          )}
      </ImageBackground>
    </View>
  );
}
